jest.mock("./../../models/user/user.model");
import { signInUser } from "./../../service/auth.service";
import { UserDocument } from "./../../models/user/user.types";
import { UserModel } from "./../../models/user/user.model";
import {
    mockUser,
    mockUserWithId,
    responseUser,
    userWithCorrectPassword,
    userWithWrongPassword,
} from "./../resources/user";
import { registerNewUser } from "../../service/auth.service";
import { BaseUser } from "../../interfaces/user.interfaces";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";

const { findOne, create, findByCredentials } = UserModel;

describe("Auth service tests", () => {
    it("returns error if user exists", async () => {
        (findOne as jest.Mock).mockReturnValue([mockUser as UserDocument]);
        const expectedResponse = buildServiceResponse(true, 401, "This email is already in use");
        const response: ServiceResponse<BaseUser> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
    it("returns success if user is created", async () => {
        (findOne as jest.Mock).mockReturnValue(null);
        (create as jest.Mock).mockReturnValue(mockUser as UserDocument);
        const expectedResponse = buildServiceResponse(false, 200, "", mockUser);
        const response: ServiceResponse<BaseUser> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
    it("handles creation error", async () => {
        (findOne as jest.Mock).mockReturnValue(null);
        (create as jest.Mock).mockReturnValue(undefined);
        const expectedResponse = buildServiceResponse(true, 500, "An error occured");
        const response: ServiceResponse<BaseUser> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
    it("returns error if user doesn't exist", async () => {
        (findByCredentials as jest.Mock).mockReturnValue(null);
        const expectedResponse = buildServiceResponse(true, 404, "This user doesn't exist");
        const response: ServiceResponse<BaseUser> = await signInUser(userWithCorrectPassword);
        expect(response).toEqual(expectedResponse);
    });
    it("returns error if password is wrong", async () => {
        (findByCredentials as jest.Mock).mockReturnValue(null);
        (findOne as jest.Mock).mockReturnValue(mockUser);
        const expectedResponse = buildServiceResponse(true, 404, "Wrong password");
        const response: ServiceResponse<BaseUser> = await signInUser(userWithWrongPassword);
        expect(response).toEqual(expectedResponse);
    });
    it("returns success if user is signedIn", async () => {
        (findByCredentials as jest.Mock).mockReturnValue(mockUserWithId as UserDocument);
        const expectedResponse = buildServiceResponse(false, 200, "", responseUser);
        const response: ServiceResponse<BaseUser> = await signInUser(userWithCorrectPassword);
        expect(response).toEqual(expectedResponse);
    });
});
