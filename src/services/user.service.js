import {ExceptionBadRequest} from "../common/helpers/exception.helper.js";
import helper from "../common/helpers/common.helper.js";
import {prisma} from "../models/generated/prisma.connect.js";
import cloudinary from "../common/helpers/cloudinary/cloudinary.helper.js";

const userServices = {
    async getUserInfo (req, res, next) {
        return req.user
    },

    async updateUserInfo (req, res, next) {     
        const userId = req.user.userId;
        const existAvatar = req.user.avatar;
        const file = req.file.buffer;
        let updateParam = {...req.reqParams};
        
        if (req.file) {
            // Upload avatar if having img file
            const upResult = await cloudinary.upload(file, {public_id_prefix: 'avatar', asset_folder: 'avatar'});
            if (!upResult.public_id) throw new ExceptionBadRequest("Upload fail!");
            cloudinary.transform(upResult.public_id, 500, 500);
            if (existAvatar) await cloudinary.remove(existAvatar);
            updateParam.avatar = upResult.public_id;
        };
        
        await prisma.users.update({
            where: {
                userId: userId,
            },
            data: updateParam
        });

        return "OK"
    },
};

export default userServices;