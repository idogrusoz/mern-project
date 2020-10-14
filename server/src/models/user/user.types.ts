import { Document, Model } from "mongoose";
import { UserInterface } from "../../interfaces/user.interfaces";

export interface UserDocument extends UserInterface, Document {}

export interface UserModel extends Model<UserDocument> {}
