import helper from "../../helpers/common.helper.js";
import {ExceptionBadRequest} from "../../helpers/exception.helper.js";

const bookmarkValidator = {
    isBookmark (req, res, next) {
        const {id} = req.params;
        const userId = req.user.userId;

        if (!id || isNaN(parseInt(id))) {
            throw new ExceptionBadRequest("Invalid bookmark id");
        }

        req.reqParams = {
            ...req.reqParams,
            id: parseInt(id),
            userId: userId
        };

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

export default bookmarkValidator;