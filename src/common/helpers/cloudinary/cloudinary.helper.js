
import { v2 as cloudinary } from 'cloudinary';
import {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from "../../constant/common.constant.js";
import { ExceptionBadRequest } from '../exception.helper.js';

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const cloudinaryHelper = {
    async upload(file, option={}) {
        try {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(option,(error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                }).end(file);
            });
            return uploadResult;
        } catch (err) {
            return err
        }
    },

    async optimize(publicId) {  
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        // console.log(optimizeUrl);
        return optimizeUrl;
    },

    async transform(publicId, width, height) {
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(publicId, {
            crop: 'auto',
            gravity: 'auto',
            width: width,
            height: height,
        });
        // console.log(autoCropUrl);
        return autoCropUrl;
    },

    async remove(id) {
        try {
            const destroyResult = await cloudinary.uploader.destroy(id);
            return destroyResult;
        } catch (err) {
            return err;
        };
    }
}

export default cloudinaryHelper;