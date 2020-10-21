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
