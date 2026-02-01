import resHelper from "../common/helpers/response.helper.js";
import StatusCode from "../common/constant/statusCode.constant.js";
import { bookmarkService } from "../services/bookmark.service.js";

export const bookmarkController = {
    async toggle(req, res, next) {
        try {
            const result = await bookmarkService.toggle(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Toggle bookmark successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async isBookmark(req, res, next) {
        try {
            const result = await bookmarkService.isBookmark(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get bookmark status successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },

    async getBookmarkByUser(req, res, next) {
        try {
            const result = await bookmarkService.getBookmarkByUser(req);
            const response = resHelper.successRes(StatusCode.OK, result, `Get bookmarks by user successfully`);
            res.status(response.statusCode).json(response);
        } catch (err) {
            next(err);
        }
    },
};