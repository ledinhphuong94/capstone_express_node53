import express from 'express';
import {likeController} from "../controllers/like.controller.js";
import authProtect from '../common/middleware/protect.middleware.js';
import likeValidator from '../common/middleware/requestValidator/like.validator.js';

const likeRouter = express.Router({mergeParams: true});

// Tạo route CRUD
likeRouter.post('/', authProtect, likeValidator.toggle, likeController.toggle);
likeRouter.get('/', authProtect, likeValidator.findMany, likeController.findAll);

export default likeRouter;