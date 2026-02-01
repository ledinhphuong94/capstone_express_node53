import { ExceptionBadRequest, ExceptionUnauthorized } from "../helpers/exception.helper.js";
import jwtHelper from "../helpers/jwt/jwt.helper.js";
import {JWT_AT_SIGNATURE} from "../constant/common.constant.js";
import {prisma} from "../../models/generated/prisma.connect.js";

const authProtect = async (req, res, next) => {
    // const header = req.header;
    const {authorization} = req.headers;
    if (!authorization) throw new ExceptionBadRequest("No authorization!");
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw new ExceptionBadRequest("Authorization is not Bearer type!");

    const {userId} = jwtHelper.verifyToken(token, JWT_AT_SIGNATURE);
    if (!userId) throw new ExceptionBadRequest("userId not found!");

    const user = await prisma.users.findUnique({
        where: {
            userId: userId,
            isDeleted: false,
        }
    });
    if (!user) throw new ExceptionUnauthorized("User not found!");
    
    const {deletedBy, deletedAt, googleId, password, isDeleted, updatedAt, ...mainInfo} = user;

    req.user = mainInfo;
    next();
};

export default authProtect;