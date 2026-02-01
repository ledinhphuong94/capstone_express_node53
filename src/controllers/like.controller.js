import resHelper from "../common/helpers/response.helper.js";
import StatusCode from "../common/constant/statusCode.constant.js";
import { likeService } from "../services/like.service.js";

export const likeController = {
    async toggle(req, res, next) {
        try {
            const result = await likeService.toggle(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Toggle like successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async findAll(req, res, next) {
        try {
            const result = await likeService.findAll(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get all likes successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
};