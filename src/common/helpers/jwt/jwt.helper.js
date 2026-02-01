import jwt from "jsonwebtoken";
import {JWT_AT_SIGNATURE, JWT_RT_SIGNATURE} from "../../constant/common.constant.js";

const jwtHelper = {
    genToken(payload) {
        const AT = jwt.sign((payload), JWT_AT_SIGNATURE, {expiresIn: '10m'});
        const RT = jwt.sign((payload), JWT_RT_SIGNATURE, {expiresIn: '1d'});
        return {
            accessToken: AT,
            refreshToken: RT
        }
    },

    verifyToken(token, SIGNATURE, option={}) {
        return jwt.verify(token, SIGNATURE, option);
    }
};

export default jwtHelper;