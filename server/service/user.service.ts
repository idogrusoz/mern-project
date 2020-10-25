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
    const result = await UserModel.searchUser(term);
    return result;
};

const mapUsers = (users: UserDocument[]): SearchedUser[] => {
    return users.map((user: UserDocument) => {
        return adaptUser(user);
    });
};

const adaptUser = (user: UserDocument): SearchedUser => {
    return {
        _id: user._id,
        image: user.image || "",
        userName: user.userName,
        displayName: user.displayName,
        followers: user.followers,
        following: user.following,
    };
};

export const followUser = async (
    followerUser: string,
    followedUser: string,
): Promise<ServiceResponse<SearchedUser>> => {
    try {
        const followingUser = await addFollowing(followerUser, followedUser);
        if (followingUser) {
            const result = await addFollowers(followerUser, followedUser);
            if (result) {
                return buildServiceResponse(false, 200, "", adaptUser(result));
            }
        }
        return buildServiceResponse(true, 400, "Bad request");
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const addFollowing = async (followerUser: string, followedUser: string): Promise<UserDocument | null> => {
    const result = await UserModel.findByIdAndUpdate(
        { _id: followerUser },
        { $addToSet: { following: followedUser } },
        { new: true },
    );
    return result;
};

const addFollowers = async (followerUser: string, followedUser: string): Promise<UserDocument | null> => {
    const result = await UserModel.findByIdAndUpdate(
        { _id: followedUser },
        { $addToSet: { followers: followerUser } },
        { new: true },
    );
    return result;
};

export const unFollowUser = async (
    followerUser: string,
    followedUser: string,
): Promise<ServiceResponse<SearchedUser>> => {
    try {
        const followingUser = await removeFollowing(followerUser, followedUser);
        if (followingUser && followingUser.following?.indexOf(followedUser) === -1) {
            const result = await removeFollowers(followerUser, followedUser);
            if (result) {
                return buildServiceResponse(false, 200, "", adaptUser(result));
            }
        }
        return buildServiceResponse(true, 400, "Bad request");
    } catch (error) {
        return buildServiceResponse(true, 400, error.message);
    }
};

const removeFollowing = async (followerUser: string, followedUser: string): Promise<UserDocument | null> => {
    const result = await UserModel.findByIdAndUpdate(
        { _id: followerUser },
        { $pull: { following: followedUser } },
        { new: true },
    );
    return result;
};

const removeFollowers = async (followerUser: string, followedUser: string): Promise<UserDocument | null> => {
    const result = await UserModel.findByIdAndUpdate(
        { _id: followedUser },
        { $pull: { followers: followerUser } },
        { new: true },
    );
    return result;
};

export const findUserById = async (userId: string): Promise<UserDocument | null> => {
    const user = await UserModel.findOne({ _id: userId });
    return user;
};
