import JWT from "jsonwebtoken";
import axios from "axios";
import { UserModel } from "./../models/user/user.model";
import { UserInterface, SignInUser, BaseUser, ResponseUser } from "./../interfaces/user.interfaces";
import { UserDocument } from "../models/user/user.types";
import buildServiceResponse, { ServiceResponse } from "../utils/serviceResponse";

export const registerNewUser = async (user: UserInterface): Promise<ServiceResponse<BaseUser>> => {
    const getExistingUser = await findUser(user.email);
    try {
        if (getExistingUser === null) {
            const image = await generateImage(user.firstName);
            if (image !== "") {
                user.image = image;
            }
            const newUser = await createUser(user);
            console.log("New user created");
            if (newUser) {
                return buildServiceResponse(false, 200, "", newUser as BaseUser);
            } else {
                return buildServiceResponse(true, 500, "An error occured");
            }
        } else {
            return buildServiceResponse(true, 409, "This email is already in use");
        }
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const findUser = async (email: string): Promise<UserDocument | null> => {
    const user = await UserModel.findOne({ email });
    return user;
};

const generateImage = async (name: string): Promise<string> => {
    const gender: "male" | "female" = name.charAt(name.length - 1) === ("a" || "e") ? "female" : "male";
    try {
        const response = await axios(`https://uifaces.co/api?limit=1&gender[]=${gender}`, {
            method: "GET",
            headers: {
                "X-API-KEY": process.env.UI_FACES_API_KEY as string,
                Accept: "application/json",
                "Cache-Control": "no-cache",
            },
        });
        return response.data[0].photo;
    } catch (error) {
        return "";
    }
};

const createUser = async (data: UserInterface): Promise<UserDocument> => {
    const newUser = await UserModel.create(data);
    return newUser;
};

export const signInUser = async (data: SignInUser): Promise<ServiceResponse<ResponseUser>> => {
    try {
        const user = await findUserByEmailCredentials(data.email, data.password);
        if (!user) {
            const userWithEmail = await findUser(data.email);
            if (userWithEmail === null) {
                return buildServiceResponse(true, 404, "This user doesn't exist");
            } else {
                return buildServiceResponse(true, 401, "Wrong password");
            }
        } else {
            return buildServiceResponse(false, 200, "", buildUser(user));
        }
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const findUserByEmailCredentials = async (email: string, password: string): Promise<UserDocument | null> => {
    try {
        const user = await UserModel.findByCredentials(email, password);
        return user;
    } catch (error) {
        return null;
    }
};

const buildUser = (user: UserDocument): ResponseUser => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email,
        userName: user.userName,
        image: user.image,
    };
};

export const signToken = (userId: string): string => {
    return JWT.sign({ _id: userId, access: "user" }, process.env.JWT_SECRET as string, {
        expiresIn: "24h",
    });
};

export const verifyToken = async (token: string): Promise<ServiceResponse<ResponseUser>> => {
    try {
        const user = await findByToken(token);
        if (user === null) {
            return buildServiceResponse(true, 401, "Unauthorized");
        } else {
            return buildServiceResponse(false, 200, "", buildUser(user));
        }
    } catch (error) {
        return buildServiceResponse(true, 401, error.message);
    }
};

const findByToken = async (token: string): Promise<UserDocument | null> => {
    const user = await UserModel.findByToken(token);
    return user;
};
