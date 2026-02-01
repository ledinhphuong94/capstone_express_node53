import resHelper from "../common/helpers/response.helper.js";
import authServices from "../services/auth.service.js";
import StatusCode from "../common/constant/statusCode.constant.js";
import {VERIFY_CODE_TIME} from "../common/constant/common.constant.js";

const authControllers = {
    async register (req, res, next) {
        const data = await authServices.register(req);
        const response = resHelper.successRes(StatusCode.CREATED, data, `A 6 digit code has been sent to your email. Valid within ${VERIFY_CODE_TIME} mins`);
        res.status(response.statusCode).json(response);
    },

    async verifyOtp (req, res, next) {
        const data = await authServices.verifyOtp(req);
        const response = resHelper.successRes(StatusCode.OK, data, "Verify email succesfully. Please login");
        res.status(response.statusCode).json(response);
    },

    async genOtp (req, res, next) {
        const data = await authServices.genOtp(req);
        const response = resHelper.successRes(StatusCode.OK, data, `Generate OTP succesfully. Please check your email. Valid within ${VERIFY_CODE_TIME} mins`);
        res.status(response.statusCode).json(response);
    },

    async login (req, res, next) {
        const data = await authServices.login(req);
        const response = resHelper.successRes(StatusCode.OK, data, `Login successfully`);
        res.status(response.statusCode).json(response);
    },

    async refreshToken (req, res, next) {
        const data = await authServices.refreshToken(req);
        const response = resHelper.successRes(StatusCode.CREATED, data);
        res.status(response.statusCode).json(response);
    },

    async logout (req, res, next) {
        const data = await authServices.logout(req);
        const response = resHelper.successRes(StatusCode.OK, data, `Logout successfully`);
        res.status(response.statusCode).json(response);
    },
};

export default authControllers;