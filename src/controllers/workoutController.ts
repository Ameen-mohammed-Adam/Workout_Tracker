import { catchAsync } from "../middleware/catchAsync.js";
import { ResFunc } from "../middleware/Response.js";
import { Workout } from "../models/WorkoutModel.js";
import { AppError } from "../utils/AppError.js";
import { isValidObjectId } from "mongoose";

export const getWorkouts = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const workouts = await Workout.find({ userID: user._id });
  ResFunc(res, 200, workouts);
});
export const getWorkoutById = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const workoutId = req.params.id as string | undefined;
  if (!workoutId) {
    return next(new AppError(400, "Missing workout id parameter."));
  }
  if (!isValidObjectId(workoutId)) {
    return next(new AppError(400, "Invalid workout id."));
  }
  const workout = await Workout.findOne({
    _id: workoutId,
    $or: [{ userID: user._id }, { allowedUsers: { $in: [user._id] } }],
  });
  if (!workout) {
    return next(new AppError(404, "Workout not found."));
  }
  ResFunc(res, 200, workout);
});
export const postWorkout = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const { title, allowedUsers = [], exercises = [] } = req.body;
  if (!title) {
    return next(new AppError(400, "'title' is required."));
  }
  const workout = await Workout.create({
    userID: user._id,
    allowedUsers,
    exercises,
    title,
  });
  ResFunc(res, 201, workout);
});
export const updateWorkout = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const { title, allowedUsers } = req.body;
  const updateData = {} as any;
  if (typeof title === "string") updateData.title = title;
  if (typeof allowedUsers === "object") updateData.allowedUsers = allowedUsers;
  const workoutId = req.params.id as string | undefined;
  if (!workoutId) {
    return next(new AppError(400, "Missing workout id parameter."));
  }
  const workout = await Workout.findOneAndUpdate(
    {
      _id: workoutId,
      userID: user._id,
    },
    updateData,
    { returnDocument: "after", runValidators: true },
  );
  if (!workout) {
    return next(new AppError(404, "Workout not found."));
  }
  ResFunc(res, 200, workout);
});
export const postExercises = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const workoutId = req.params.id as string | undefined;
  if (!workoutId) {
    return next(new AppError(400, "Missing workout id parameter."));
  }
  const workout = await Workout.findById(workoutId);
  if (!workout) {
    return next(new AppError(404, "Workout not found."));
  }
  const { exercise = [] } = req.body;
  if (!exercise.length) {
    return next(new AppError(400, "exercise is needed to add it to workout."));
  }
  workout.exercises.push(exercise);
  workout.save();
  ResFunc(res, 201, workout);
});
export const updateExercises = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const workoutId = req.params.id as string | undefined;
  if (!workoutId) {
    return next(new AppError(400, "Missing workout id parameter."));
  }
  const workout = await Workout.findById(workoutId);
  if (!workout) {
    return next(new AppError(404, "Workout not found."));
  }
  const { exercises = [] } = req.body;
  if (exercises.length === 0) {
    return ResFunc(res, 200, workout);
  }
});
export const deleteWorkout = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError(401, "Authentication required."));
  }
  const workoutId = req.params.id as string | undefined;
  if (!workoutId) {
    return next(new AppError(400, "Missing workout id parameter."));
  }
  const workout = await Workout.findOneAndDelete({
    _id: workoutId,
    userID: user._id,
  });
  if (!workout) {
    return next(new AppError(404, "Workout not found."));
  }
  ResFunc(res, 200, "Workout deleted successfully.");
});
