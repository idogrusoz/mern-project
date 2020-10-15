import { Document, Model } from "mongoose";
import { UserInterface } from "../../interfaces/user.interfaces";

export interface UserDocument extends UserInterface, Document {}

export interface IUserModel extends Model<UserDocument> {
    findByToken: (token: string) => UserDocument | null;
    findByCredentials: (email: string, password: string) => UserDocument | null;
}
