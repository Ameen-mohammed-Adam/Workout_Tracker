import express, { NextFunction, Request, Response } from "express";
import { MongoDB } from "./Mongodb.js";
import { AppError } from "./utils/AppError.js";
import { userRouter } from "./routes/authRoute.js";
import { workoutRouter } from "./routes/workoutRoutes.js";
import { progressRouter } from "./routes/progressRoutes.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.get("/", (req, res: Response, next) => {
  res.send("Server Running.... ");
});
//
app.use("/auth", userRouter);
app.use("/workouts", workoutRouter);
app.use("/progress", progressRouter);
app.use((req, res: Response, next) => {
  res.status(404).send("NOT FOUND.");
});
//
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(statusCode).json({ Error: message });
});
//
const port = Number(process.env.PORT) || 3333;
app.listen(port, () => {
  console.log("[+] Server Running On Port", port);
  MongoDB();
});
