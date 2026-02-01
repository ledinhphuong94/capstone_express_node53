import { ExceptionBadRequest } from "../helpers/exception.helper.js";
import resHelper from "../helpers/response.helper.js";
import jwt from "jsonwebtoken";

const handleError = (err, req, res, next) => {
    console.error('>>>> final middleware', err.message);
    if (err instanceof jwt.TokenExpiredError) {
        err.message = "Token expired, please refresh token or re-login!";
    };

    const response = resHelper.errorRes(err.errCode, err.message);
    res.status(response.statusCode).json(response);
};

export default handleError;