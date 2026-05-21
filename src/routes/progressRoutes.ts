import { Router } from "express";
import { protect } from "../controllers/authController.js";
import {
  getProgress,
  postProgress,
} from "../controllers/progressController.js";
export const progressRouter = Router();
progressRouter.post("/", protect, postProgress);
progressRouter.get("/", protect, getProgress);
