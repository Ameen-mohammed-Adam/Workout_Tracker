import mongoose, { Schema, Document, model } from "mongoose";

interface Iworkout extends Document {
  userID: mongoose.Types.ObjectId;
  allowedUsers: mongoose.Types.ObjectId[];
  title: string;
  exercises: [
    {
      name: string;
      sets: number;
      reps: number;
    },
  ];
  createdAt?: string;
  updatedAt?: string;
}

const workoutSchema = new Schema<Iworkout>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userID is required"],
    },
    allowedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    exercises: [
      {
        name: {
          type: String,
          required: [true, "name is required."],
          unique: true,
        },
        sets: { type: Number, default: 0 },
        reps: { type: Number, default: 0 },
      },
    ],
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
workoutSchema.index({ userID: 1, title: 1 }, { unique: true });
workoutSchema.index({ userID: 1, "exercises.name": 1 }, { unique: true });
export const Workout = model("Workout", workoutSchema);
