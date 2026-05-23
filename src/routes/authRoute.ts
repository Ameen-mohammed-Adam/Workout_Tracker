import { Router } from "express";
import * as UserController from "../controllers/authController.js";
import { UserValidation } from "../utils/validations/UserValidation.js";
import { validate } from "../middleware/validate.js";
export const userRouter = Router();
userRouter.post("/register", validate(UserValidation), UserController.register);
userRouter.post("/login", UserController.login);
