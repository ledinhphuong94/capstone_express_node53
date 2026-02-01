import express from "express";
import userControllers from "../controllers/user.controller.js";
import authProtect from "../common/middleware/protect.middleware.js";
import userValidator from "../common/middleware/requestValidator/user.validator.js";
import {cloudUpload} from "../common/helpers/multer/multer.helper.js";

const userRouter = express.Router();
userRouter.get('/personal', authProtect, userControllers.getUserInfo);
userRouter.put('/personal', cloudUpload.single('avatar'), userValidator.updateUserInfo.bind(userValidator), authProtect, userControllers.updateUserInfo);

export default userRouter;