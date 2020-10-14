import { model } from "mongoose";
import UserSchema from "./user.schema";
import { UserDocument } from "./user.types";

export const UserModel = model<UserDocument>("User", UserSchema);
