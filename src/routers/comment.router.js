import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import authProtect from '../common/middleware/protect.middleware.js';
import commentValidator from '../common/middleware/requestValidator/comment.validator.js';

const commentRouter = express.Router({mergeParams: true});

// Tạo route CRUD
commentRouter.post('/', authProtect, commentValidator.create, commentController.create);
commentRouter.get('/', authProtect, commentValidator.findMany, commentController.findAll);
commentRouter.put('/:commentId', authProtect, commentValidator.update, commentController.update);
commentRouter.delete('/:commentId', authProtect, commentValidator.remove, commentController.remove);

export default commentRouter;