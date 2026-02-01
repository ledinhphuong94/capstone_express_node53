import express from 'express';
import {bookmarkController} from "../controllers/bookmark.controller.js";
import authProtect from '../common/middleware/protect.middleware.js';

const bookmarkByUserRouter = express.Router({mergeParams: true});

// Tạo route CRUD
bookmarkByUserRouter.get('/', authProtect, bookmarkController.getBookmarkByUser);

export default bookmarkByUserRouter;