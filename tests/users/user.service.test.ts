import { mockUsersArray } from "./../test-resources/user";
import { UserModel } from "../../models/user/user.model";
import { mockUser } from "../test-resources/user";
import { registerNewUser } from "../../service/auth.service";
import { BaseUser, SearchedUser } from "../../interfaces/user.interfaces";
import { ServiceResponse } from "../../utils/serviceResponse";
import mongoose from "../../config/db";
import { MONGO_URI } from "../jest.setup";
import { findOneUser, followUser, isUserNameFree, search, unFollowUser } from "../../service/user.service";
import { UserDocument } from "../../models/user/user.types";

describe("Auth service tests", () => {
    let connection: typeof mongoose;
    let user1: UserDocument | null;
    let user2: UserDocument | null;
    beforeAll(async () => {
        connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await UserModel.deleteMany({});
        await connection.disconnect();
    });
    it("returns success if user is created", async () => {
        const response: ServiceResponse<BaseUser> = await registerNewUser(mockUser);
        expect(response.data?.email).toEqual(mockUser.email);
    });
    it("returns error if username exist", async () => {
        const response: ServiceResponse<boolean> = await isUserNameFree(mockUser.userName);
        expect(response.data).not.toBeTruthy();
    });
    it("returns true if username doesn't exist", async () => {
        const response: ServiceResponse<boolean> = await isUserNameFree(mockUser.userName + "1");
        expect(response.data).toBeTruthy();
    });
    it("returns search users with a search term", async () => {
        for (let user of mockUsersArray) {
            await UserModel.create(user);
        }
        const response: ServiceResponse<SearchedUser[]> = await search("post");
        expect(response.data?.length).toBe(3);
    });
    it("creates follow relation", async () => {
        user1 = await UserModel.findOne({ email: "johndoe@test.test" });
        user2 = await UserModel.findOne({ email: "janedoe@test.test" });
        const response: ServiceResponse<SearchedUser> = await followUser(user1?._id, user2?._id);
        expect(response.data?.followers?.length).toBe(1);
    });
    it("destroys follow relation", async () => {
        const response: ServiceResponse<SearchedUser> = await unFollowUser(user1?._id, user2?._id);
        expect(response.data?.followers?.length).toBe(0);
    });
    it("finds single user", async () => {
        const response: ServiceResponse<SearchedUser> = await findOneUser(user1?._id);
        expect(response.data?.userName).toEqual(mockUsersArray[0].userName);
    });
});
