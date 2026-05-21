import { Router } from "express";
import * as UserController from "../controllers/authController.js";

export const userRouter = Router();
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
