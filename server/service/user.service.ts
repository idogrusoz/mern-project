import { SearchedUser } from "../interfaces/user.interfaces";
import { UserModel } from "../models/user/user.model";
import { UserDocument } from "../models/user/user.types";
import buildServiceResponse, { ServiceResponse } from "../utils/serviceResponse";

export const isUserNameFree = async (userName: string): Promise<ServiceResponse<boolean>> => {
    const result = await findByUserName(userName);
    try {
        if (result.length > 0) {
            return buildServiceResponse(false, 409, "", false);
        } else {
            return buildServiceResponse(false, 200, "", true);
        }
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const findByUserName = async (userName: string): Promise<UserDocument[]> => {
    const user = await UserModel.find({ userName });
    return user;
};

export const search = async (term: string): Promise<ServiceResponse<SearchedUser[]>> => {
    try {
        const users = await findBySearchTerm(term);
        return buildServiceResponse(false, 200, "", mapUsers(users));
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const findBySearchTerm = async (term: string): Promise<UserDocument[]> => {
    var searchKey = new RegExp(term, "i");
    const result = await UserModel.find({
        $or: [{ email: searchKey }, { displayName: searchKey }, { userName: searchKey }],
    });
    return result;
};

const mapUsers = (users: UserDocument[]): SearchedUser[] => {
    return users.map((user: UserDocument) => {
        return {
            _id: user._id,
            image: user.image || "",
            userName: user.userName,
            displayName: user.displayName,
        };
    });
};
