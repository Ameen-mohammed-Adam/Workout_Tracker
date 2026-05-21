import mongoose from "mongoose";
import { User } from "./models/UserModel.js";
import "dotenv/config";
const uri = process.env.MONGODB_URI || "";
const admin_Email = process.env.ADMIN_EMAIL || "";
const admin_password = process.env.ADMIN_PASSWORD || "";
export const MongoDB = async () => {
  if (!uri) {
    console.log("MongoDB URI not Found");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("[+] MongoDB connected");
  } catch (err: unknown) {
    console.log("[-] Error Can't connect to MongoDB");
    if (err instanceof Error) {
      console.log(err.name);
      console.log(err.message);
    } else {
      console.log(String(err));
    }
    return;
  }
  const exists = (await User.find({ email: admin_Email })).length
    ? true
    : false;
  if (exists) {
    return;
  }
  await User.create({
    name: "SUPER USER",
    password: admin_password,
    email: admin_Email,
    role: "admin",
  });
  console.log("[+] Super User Created!!");
};
