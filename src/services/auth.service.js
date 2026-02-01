import {ExceptionBadRequest} from "../common/helpers/exception.helper.js";
import helper from "../common/helpers/common.helper.js";
import {prisma} from "../models/generated/prisma.connect.js";
import bcrypt from "../common/helpers/bcrypt/bcrypt.helper.js";
import {VERIFY_CODE_TIME, JWT_AT_SIGNATURE, JWT_RT_SIGNATURE} from "../common/constant/common.constant.js";
import emailjsHelper from "../common/helpers/emailJs/emailjs.helper.js";
import bcryptHelper from "../common/helpers/bcrypt/bcrypt.helper.js";
import jwtHelper from "../common/helpers/jwt/jwt.helper.js";

const authServices = {
    async register (req, res, next) {
        const {email, password, name, birthDate} = req.body;
        const userExist = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if (userExist) {
            throw new ExceptionBadRequest("Email is not valid!")
        };

        let passCode = helper.generateOTP();
        const user = await prisma.users.create({
            data: {
                email: email,
                password: bcrypt.hashPassword(password),
                name: name,
                birthDate: new Date(birthDate),
                verifiedEmail: {
                    create: {
                        verifyCode: passCode,
                        codeExpiration: helper.genExpiredTime(VERIFY_CODE_TIME)
                    }
                }
            },
        });

        await emailjsHelper.sendOTPEmail(passCode, email);

        return {
            userId: user.userId,
            isVerifyEmail: user.isVerifyEmail
        }
    },

    async verifyOtp (req, res, next) {
        const {userId, verifyCode} = req.body;
        const otp = await prisma.verifiedEmail.findUnique({
            where: {
                userId: userId,
                verifyCode: verifyCode,
                isDeleted: false,
            }
        });
        if (!otp) throw new ExceptionBadRequest("OTP is not correct!");
        const expiredTime = new Date(otp.codeExpiration);
        const now = new Date();
        console.log(otp.codeExpiration, now)
        if (expiredTime < now) throw new ExceptionBadRequest("OTP expired! Please re-generate new one!");

        await prisma.users.update({
            where: {
                userId: userId
            },
            data: {
                isVerifyEmail: true,
                verifiedEmail: {
                    update: {
                        isDeleted: true,
                        deletedAt: new Date()
                    }
                }
            },
        });

        return 'OK'
    },

    async genOtp (req, res, next) {
        const {userId} = req.body;
        const user = await prisma.verifiedEmail.findUnique({
            where: {
                userId: userId,
                isDeleted: false,
            }
        });
        if (!user) throw new ExceptionBadRequest("Can not generate OTP with this userId!");

        const passCode = helper.generateOTP();
        const otp = await prisma.verifiedEmail.update({
            where: {
                userId: userId,
            },
            data: {
                verifyCode: passCode,
                codeExpiration: helper.genExpiredTime(VERIFY_CODE_TIME)
            },
            select: {
                users: {
                    select: {
                        email: true
                    }
                }
            }
        });
        if (!otp) throw new ExceptionBadRequest("Can not generate OTP!");

        const email = otp.users.email;
        await emailjsHelper.sendOTPEmail(passCode, email);

        console.log(otp)
        return 'OK'
    },

    async login (req, res, next) {
        const {email, password} = req.body;
        console.log(req.body)
        const user = await prisma.users.findUnique({
            where: {
                email: email,
                isDeleted: false,
            }
        });
        if (!user) throw new ExceptionBadRequest("Account is not valid!");
        // Check password
        const isCorrectPass = bcryptHelper.checkPassword(password, user.password);
        if (!isCorrectPass) throw new ExceptionBadRequest("Wrong email or password!");
        // Check if verify email
        const isVerifyEmail = user.isVerifyEmail;
        if (!isVerifyEmail) throw new ExceptionBadRequest("Please verify your email with OTP first!");
        // Gen token
        const token = jwtHelper.genToken({userId: user.userId});
        // Gen session ID
        const sessionID = helper.genSessionID(user.userId);
        await prisma.users.update({
            where: {
                userId: user.userId,
            },
            data: {
                sessionId: sessionID
            }
        });
        return {
            userId: user.userId,
            sessionId: sessionID,
            ...token,
        }

    },

    async refreshToken (req, res, next) {
        const {accessToken, refreshToken} = req.body;
        const payloadAT = jwtHelper.verifyToken(accessToken, JWT_AT_SIGNATURE, {ignoreExpiration: true});
        const payloadRT = jwtHelper.verifyToken(refreshToken, JWT_RT_SIGNATURE);
        const {userId: idAT} = payloadAT;
        const {userId: idRT} = payloadRT;
        if (!idAT || !idRT || idAT !== idRT) throw new ExceptionBadRequest("Payload in token is not correct!");

        const user = await prisma.users.findUnique({
            where:{
                userId: idAT,
                isDeleted: false
            }
        });
        if (!user) throw new ExceptionBadRequest("User not found!");
        // Gen token
        const token = jwtHelper.genToken({userId: user.userId});
        return {
            ...token,
        }
    },

    async logout (req, res, next) {
        const userId = req.user.userId;
        // Clear sessionId when logout
        await prisma.users.update({
            where: {
                userId: userId
            },
            data: {
                sessionId: ""
            }
        });
        return "OK"
    },

};

export default authServices;