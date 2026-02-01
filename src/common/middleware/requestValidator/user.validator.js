import helper from "../../helpers/common.helper.js";
import {ExceptionBadRequest} from "../../helpers/exception.helper.js";
import fs from 'fs';

const userValidator = {
    updateUserInfo (req, res, next) {
        const {name, birthDate, aboutMe} = req.body;
        let reqParams = {};

        if (name) reqParams.name = name;
        if (birthDate) reqParams.birthDate = new Date(birthDate);
        if (aboutMe) reqParams.aboutMe = aboutMe;

        // validate date
        if (birthDate && !helper.isValidDate(birthDate)) {
            throw new ExceptionBadRequest("Birthday must be YYYY-MM-DD");
        };

        if (!this.updateUserAvatar(req)) return;
        
        req.reqParams = reqParams;

        next();
    },

    updateUserAvatar (req) {
        const LIMIT_MB = 20;
        // console.log(req.file)
        if (req.file) {
            let buffer = req.file.buffer;
            let size = req.file.size;
            // console.log('>> file', req.file)
            
            const isImgFile = helper.isImage(buffer);
            if (!isImgFile) throw new ExceptionBadRequest("Uploaded file must be an image");
    
            const isGoodSize = helper.isOnSizeLimit(size, LIMIT_MB);
            if (!isGoodSize) throw new ExceptionBadRequest(`Avatar should be less than ${LIMIT_MB} MB`);
        };
        return true;
    },
};

export default userValidator;