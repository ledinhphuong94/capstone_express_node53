import express from "express";
import authProtect from "../common/middleware/protect.middleware.js";
import userValidator from "../common/middleware/requestValidator/user.validator.js";
import {postController} from "../controllers/post.controller.js";
import {cloudUpload} from "../common/helpers/multer/multer.helper.js";
import postValidator from "../common/middleware/requestValidator/post.validator.js";

const postRouter = express.Router();
postRouter.get('/', authProtect, postValidator.findMany, postController.findAll);
postRouter.get('/:id', authProtect, postValidator.findOne, postController.findOne);
postRouter.put('/:id', authProtect, postValidator.update.bind(postValidator), postController.update);
postRouter.delete('/:id', authProtect, postValidator.remove.bind(postValidator), postController.remove);

postRouter.post('/', cloudUpload.single('post'), postValidator.create.bind(postValidator), authProtect, postController.create);

export default postRouter;