import express from 'express';
import {bookmarkController} from "../controllers/bookmark.controller.js";
import authProtect from '../common/middleware/protect.middleware.js';
import bookmarkValidator from '../common/middleware/requestValidator/bookmark.validator.js';

const bookmarkRouter = express.Router({mergeParams: true});

// Tạo route CRUD
bookmarkRouter.post('/', authProtect, bookmarkValidator.toggle, bookmarkController.toggle);
bookmarkRouter.get('/', authProtect, bookmarkValidator.isBookmark, bookmarkController.isBookmark);

export default bookmarkRouter;