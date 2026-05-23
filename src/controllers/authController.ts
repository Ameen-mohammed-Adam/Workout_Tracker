import { User } from "../models/UserModel.js";
import { catchAsync } from "../middleware/catchAsync.js";
import { ResFunc } from "../middleware/Response.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
export const register = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body || 0;
  if (!name || !password || !email) {
    return next(new AppError(400, "Please Provide name , password and emnail"));
  }
  await User.create({
    name,
    password,
    email,
  });
  ResFunc(res, 201, "User Created.");
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body || 0;
  if (!email || !password) {
    return next(new AppError(400, "Provide Email and Password"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(401, "User Not Found"));
  }
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    return next(new AppError(401, "User Not Found"));
  }
  const jwt = jsonwebtoken.sign(
    { _id: user._id, email: user.email },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "10d",
    },
  );
  console.log(user);
  ResFunc(res, 200, { token: jwt });
});
export const protect = catchAsync(async (req, res, next) => {
  const jwt = req.get("Authorization")?.split(" ")[1] || 0;
  if (!jwt || jwt.length == 0) {
    return next(new AppError(400, "Please Provide authorization token."));
  }
  const exist = jsonwebtoken.verify(jwt, String(process.env.JWT_SECRET)) as {
    _id: string;
  };
  const user = await User.findById(exist._id);
  if (!user) {
    return next(new AppError(400, "Something went wrong please re-login"));
  }
  req.user = user;
  return next();
});
