import helper from "../../helpers/common.helper.js";
import {ExceptionBadRequest} from "../../helpers/exception.helper.js";

const postValidator = {
    findMany (req, res, next) {
        const {page, limit, filters} = req.query;
        let reqParams = {};

        if (page) {
            const pageNum = parseInt(page);
            if (isNaN(pageNum) || pageNum < 1) {
                throw new ExceptionBadRequest("Page must be a positive integer");
            }
            reqParams.page = pageNum;
        };

        if (limit) {
            const limitNum = parseInt(limit);
            if (isNaN(limitNum) || limitNum < 1) {
                throw new ExceptionBadRequest("Limit must be a positive integer");
            }
            reqParams.limit = limitNum;
        };

        if (filters) {
            try {
                let {imgInfo, userId} = JSON.parse(filters);
                if (imgInfo) reqParams.imgInfo = imgInfo;
                if (userId) {
                    reqParams.userId = parseInt(userId);
                    if (isNaN(reqParams.userId)) {
                        throw new ExceptionBadRequest("userId must be a valid integer");
                    };
                }
            } catch (err) {
                throw new ExceptionBadRequest("Filters must be a valid JSON string");
            };
        }

        req.reqParams = reqParams;

        next();
    },

    findOne (req, res, next) {
        const {id} = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum < 1) {
            throw new ExceptionBadRequest("ID must be a positive integer");
        }
        req.reqParams = {id: idNum};
        next();
    },

    create(req, res, next) {
        const {imgName, imgDesc} = req.body;
        let reqParams = {};
        if (imgName) reqParams.imgName = imgName;
        if (imgDesc) reqParams.imgDesc = imgDesc;
        if (!this.createImg(req)) {
            throw new ExceptionBadRequest("Image file is required or invalid");
        };
        req.reqParams = reqParams;
        next();
    },
    createImg (req, res, next) {
        const LIMIT_MB = 20;
        if (!req.file) {
            return false;
        } else {
            let buffer = req.file.buffer;
            let size = req.file.size;
            const isImgFile = helper.isImage(buffer);
            if (!isImgFile) throw new ExceptionBadRequest("Uploaded file must be an image");
    
            const isGoodSize = helper.isOnSizeLimit(size, LIMIT_MB);
            if (!isGoodSize) throw new ExceptionBadRequest(`Upload Image should be less than ${LIMIT_MB} MB`);
        };
        return true;
    },

    update (req, res, next) {
        const {id} = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum < 1) {
            throw new ExceptionBadRequest("ID must be a positive integer");
        };
        let reqParams = {id: idNum};
        const {imgName, imgDesc} = req.body;
        if (imgName) reqParams.imgName = imgName;
        if (imgDesc) reqParams.imgDesc = imgDesc;
        req.reqParams = reqParams;
        next();
    },

    remove (req, res, next) {
        const {id} = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum < 1) {
            throw new ExceptionBadRequest("ID must be a positive integer");
        }
        req.reqParams = {id: idNum};
        next();
    },
};

export default postValidator;