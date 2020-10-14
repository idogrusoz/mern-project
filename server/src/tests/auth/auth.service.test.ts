jest.mock("./../../models/user/user.model");
import { UserDocument } from "./../../models/user/user.types";
import { UserModel } from "./../../models/user/user.model";
import { mockUser } from "./../resources/user";
import { registerNewUser, hashedPassword } from "../../service/auth.service";
import { ServiceResponse, UserInterface } from "../../interfaces/user.interfaces";
import buildServiceResponse from "../../utils/serviceResponse";

const { findOne, create } = UserModel;

describe("Auth service tests", () => {
    it("Hashes a given passport", async () => {
        const password = "password";
        const hashed = await hashedPassword(password);
        expect(hashed).toBeTruthy();
        expect(hashed).not.toEqual(password);
    });
    it("Returns 401 if user exists", async () => {
        (findOne as jest.Mock).mockReturnValue(mockUser as UserDocument);
        const expectedResponse = buildServiceResponse(true, 401, "This email is already in use");
        const response: ServiceResponse<UserInterface> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
    it("Returns 200 if user is created", async () => {
        (findOne as jest.Mock).mockReturnValue(null);
        (create as jest.Mock).mockReturnValue(mockUser as UserDocument);
        const expectedResponse = buildServiceResponse(false, 200, "", mockUser);
        const response: ServiceResponse<UserInterface> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
    it("Handles creation error", async () => {
        (findOne as jest.Mock).mockReturnValue(null);
        (create as jest.Mock).mockReturnValue(undefined);
        const expectedResponse = buildServiceResponse(true, 500, "An error occured");
        const response: ServiceResponse<UserInterface> = await registerNewUser(mockUser);
        expect(response).toEqual(expectedResponse);
    });
});
