import mongoose, { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  progress_log: mongoose.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    progress_log: { type: Schema.Types.ObjectId, default: "" },
  },
  {
    timestamps: true,
  },
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = parseInt(process.env.SALT_FOR_PASSWORD || "10");
  this.password = await bcrypt.hash(this.password, salt);
});
export const User = model("User", UserSchema);
