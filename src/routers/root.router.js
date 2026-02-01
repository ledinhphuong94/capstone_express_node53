import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";
import commentRouter from "./comment.router.js";
import likeRouter from "./like.router.js";
import bookmarkRouter from "./bookmark.router.js";
import bookmarkRouterByUser from "./bookmarkByUser.router.js";

const rootRouter = express.Router();
rootRouter.use("/auth",authRouter);
rootRouter.use("/user",userRouter);
rootRouter.use("/posts",postRouter);
rootRouter.use("/post/:id/comments",commentRouter);
rootRouter.use("/post/:id/like",likeRouter);
rootRouter.use("/post/:id/bookmark",bookmarkRouter);
rootRouter.use("/bookmarks",bookmarkRouterByUser);

export default rootRouter;
