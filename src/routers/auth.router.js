import express from "express";
import authControllers from "../controllers/auth.controller.js";
import authValidator from "../common/middleware/requestValidator/auth.validator.js";
import authProtect from "../common/middleware/protect.middleware.js";

const authRouter = express.Router();
authRouter.post('/register', authValidator.register, authControllers.register);
authRouter.post('/verifyOtp', authValidator.verifyOtp, authControllers.verifyOtp);
authRouter.post('/genOtp', authValidator.genOtp, authControllers.genOtp);
authRouter.post('/login', authValidator.login, authControllers.login);
authRouter.post('/refreshToken', authValidator.refreshToken, authControllers.refreshToken);
authRouter.post('/logout', authValidator.logout, authProtect, authControllers.logout);

export default authRouter;