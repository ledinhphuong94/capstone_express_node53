import resHelper from "../common/helpers/response.helper.js";
import {postService} from "../services/post.service.js";
import StatusCode from "../common/constant/statusCode.constant.js";

export const postController = {
    async create(req, res, next) {
        try {
            const result = await postService.create(req);
            const response = resHelper.successRes(StatusCode.CREATED, result, `Create post successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async findAll(req, res, next) {
        try {
            const result = await postService.findAll(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get all posts successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async findOne(req, res, next) {
        try {
            const result = await postService.findOne(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get post #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const result = await postService.update(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Update post #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            const result = await postService.remove(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Remove post #${req.params.id} successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    }
};