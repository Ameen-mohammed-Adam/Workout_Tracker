import { catchAsync } from "../middleware/catchAsync.js";
import { ResFunc } from "../middleware/Response.js";
import { Progress } from "../models/ProgressModel.js";
import { AppError } from "../utils/AppError.js";

export const postProgress = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const { currentWeight } = req.body ? req.body : 0;
  if (!currentWeight) {
    return next(new AppError(400, "Please Provide currentWeight."));
  }
  const post = await Progress.findOne({ _id: user.progress_log });
  if (!post) {
    const result = await Progress.create({
      userID: user._id,
      currentWeight,
    });
    user.progress_log = result._id;
    await user.save();
    return ResFunc(res, 201, result);
  }
  post.history.push({ weight: post.currentWeight, recordedAt: new Date() });
  await post.save();
  const result = await Progress.findByIdAndUpdate(
    post._id,
    { currentWeight },
    { returnDocument: "after" },
  );
  ResFunc(res, 200, result);
});

export const getProgress = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user?.progress_log) {
    return next(new AppError(404, "No Progress Log Found."));
  }
  const progress = await Progress.findById({ _id: user.progress_log }).select(
    "-__v -_id",
  );
  if (!progress) {
    return next(new AppError(404, "No Progress Log Found."));
  }
  ResFunc(res, 200, progress);
});
