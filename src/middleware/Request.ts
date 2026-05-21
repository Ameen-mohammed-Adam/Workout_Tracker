import { IUser } from "../models/UserModel.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
