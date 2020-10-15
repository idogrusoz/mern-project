import { model } from "mongoose";
import UserSchema from "./user.schema";
import { UserDocument, IUserModel } from "./user.types";

export const UserModel: IUserModel = model<UserDocument, IUserModel>("User", UserSchema);
