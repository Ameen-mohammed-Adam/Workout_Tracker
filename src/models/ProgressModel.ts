import mongoose, { model, Schema } from "mongoose";

interface IProgress {
  userID: mongoose.Types.ObjectId;
  currentWeight: number;
  history: {
    weight: number;
    recordedAt: Date;
  }[];
}

const progressSchema = new Schema<IProgress>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userID is required"],
    },
    currentWeight: {
      type: Number,
      min: [1, "weight must be positive"],
      required: [true, "add your current wight."],
    },
    history: [
      {
        weight: { type: Number, min: [1, "weight must be positive"] },
        recordedAt: { type: Date },
      },
    ],
  },
  { timestamps: true },
);

export const Progress = model("progress", progressSchema);
