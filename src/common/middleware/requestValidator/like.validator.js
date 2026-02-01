import { create } from "node:domain";
import helper from "../../helpers/common.helper.js";
import {ExceptionBadRequest} from "../../helpers/exception.helper.js";

const likeValidator = {
    findMany (req, res, next) {
        const {cursor, limit} = req.query;
        const required = {
            'id': 'number'
        };
        let reqParams = {};

        // Validate required params
        let errorMess = helper.verifyRequired(required, {id: parseInt(req.params.id)})
        if (errorMess) throw new ExceptionBadRequest(errorMess)
        reqParams.id = parseInt(req.params.id);
        if (cursor) {
            // validate date time
            if (cursor && !helper.isValidDateTime(cursor)) {
                throw new ExceptionBadRequest("Cursor must be a valid datetime");
            };
            reqParams.cursor = cursor;
        };
        if (limit) {
            const limitNum = parseInt(limit);
            if (isNaN(limitNum) || limitNum < 1) {
                throw new ExceptionBadRequest("Limit must be a positive integer");
            }
            reqParams.limit = limitNum;
        };
        req.reqParams = reqParams;

        next();
    },
    
    toggle(req, res, next) {
        const {id} = req.params;
        const required = {
            'imgId': 'number',
        };
        let reqParams = {};

        // Validate required params
        let errorMess = helper.verifyRequired(required, {imgId: parseInt(id)})
        if (errorMess) throw new ExceptionBadRequest(errorMess)
        reqParams.imgId = parseInt(id);

        req.reqParams = reqParams;

        next();
    },


};

export default likeValidator;