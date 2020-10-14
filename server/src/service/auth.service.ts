import bcrypt from "bcrypt";
import { UserModel } from "./../models/user/user.model";
import { ServiceResponse, UserInterface } from "./../interfaces/user.interfaces";
import { UserDocument } from "../models/user/user.types";
import buildServiceResponse from "../utils/serviceResponse";

export const registerNewUser = async (user: UserInterface): Promise<ServiceResponse<UserInterface>> => {
    const getExistingUser = await findUserByEmail(user.email);
    try {
        if (getExistingUser === null) {
            const newUser = await createUser(user);
            console.log("New user created");
            if (newUser) {
                return buildServiceResponse(false, 200, "", newUser as UserInterface);
            } else {
                return buildServiceResponse(true, 500, "An error occured");
            }
        } else {
            return buildServiceResponse(true, 401, "This email is already in use");
        }
    } catch (error) {
        console.log(error);
        return buildServiceResponse(true, 500, "An error occured");
    }
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
    const user = await UserModel.findOne({ email });
    return user;
};

const createUser = async (data: UserInterface): Promise<UserDocument> => {
    const hash = await hashedPassword(data.password);
    data.password = hash;
    const newUser = await UserModel.create(data);
    return newUser;
};

export const hashedPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
