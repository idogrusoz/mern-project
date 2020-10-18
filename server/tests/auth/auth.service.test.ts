// jest.mock("./../../models/user/user.model");
import { signInUser } from "./../../service/auth.service";
import { UserModel } from "./../../models/user/user.model";
import { mockUser, userWithCorrectPassword, userWithWrongPassword } from "../test-resources/user";
import { registerNewUser } from "../../service/auth.service";
import { BaseUser } from "../../interfaces/user.interfaces";
import { ServiceResponse } from "../../utils/serviceResponse";
import mongoose from "../../config/db";
import { MONGO_URI } from "../jest.setup";

describe("Auth service tests", () => {
    let connection: typeof mongoose;
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
    it("returns error if user exists", async () => {
        const response: ServiceResponse<BaseUser> = await registerNewUser(mockUser);
        expect(response.statusCode).toEqual(409);
    });
    it("handles creation error", async () => {
        const response: ServiceResponse<BaseUser> = await registerNewUser({ ...mockUser, email: "email" });
        console.log("response", response);
        expect(response.statusCode).toEqual(400);
    });
    it("returns error if user doesn't exist", async () => {
        const response: ServiceResponse<BaseUser> = await signInUser({
            email: "wrong@email.com",
            password: "password",
        });
        expect(response.statusCode).toEqual(404);
        expect(response.message).toEqual("This user doesn't exist");
    });
    it("returns error if password is wrong", async () => {
        const response: ServiceResponse<BaseUser> = await signInUser(userWithWrongPassword);
        expect(response.statusCode).toEqual(404);
        expect(response.message).toEqual("Wrong password");
    });
    it("returns success if user is signedIn", async () => {
        const response: ServiceResponse<BaseUser> = await signInUser(userWithCorrectPassword);
        expect(response.statusCode).toEqual(200);
        expect(response.data?.email).toEqual(mockUser.email);
    });
});
