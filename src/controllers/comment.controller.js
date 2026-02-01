import resHelper from "../common/helpers/response.helper.js";
import {commentService} from "../services/comment.service.js";
import StatusCode from "../common/constant/statusCode.constant.js";

export const commentController = {
    async create(req, res, next) {
        try {
            const result = await commentService.create(req);
            const response = resHelper.successRes(StatusCode.CREATED, result, `Create comment successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async findAll(req, res, next) {
        try {
            const result = await commentService.findAll(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get all comments successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const result = await commentService.update(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Update comment #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            const result = await commentService.remove(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Remove comment #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    }
};