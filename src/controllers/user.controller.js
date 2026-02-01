import resHelper from "../common/helpers/response.helper.js";
import userServices from "../services/user.service.js";
import StatusCode from "../common/constant/statusCode.constant.js";

const userControllers = {
    async getUserInfo (req, res, next) {
        const data = await userServices.getUserInfo(req);
        const response = resHelper.successRes(StatusCode.OK, data);
        res.status(response.statusCode).json(response);
    },

    async updateUserInfo (req, res, next) {
        const data = await userServices.updateUserInfo(req);
        const response = resHelper.successRes(StatusCode.OK, data);
        res.status(response.statusCode).json(response);
    },
};

export default userControllers;