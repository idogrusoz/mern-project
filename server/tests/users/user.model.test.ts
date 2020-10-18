jest.mock("jsonwebtoken");
import JWT from "jsonwebtoken";
import { userWithCorrectPassword } from "../test-resources/user";
import { UserModel } from "../../models/user/user.model";
import mongoose from "../../config/db";
import { mockUser } from "../test-resources/user";
import { MONGO_URI } from "../jest.setup";

describe("User model test", () => {
    let connection: typeof mongoose;
    let userId: string;
    beforeAll(async () => {
        connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        await UserModel.deleteMany({});
        await connection.disconnect();
    });

    it("should insert a doc into collection", async () => {
        await UserModel.create(mockUser);
        const insertedUser = await UserModel.findOne({ email: mockUser.email });
        userId = insertedUser!._id;
        expect(insertedUser).not.toEqual(null);
        expect(insertedUser?.password).not.toEqual(mockUser.password);
        expect(insertedUser?.email).toEqual(mockUser.email);
    });
    it("finds registered user", async () => {
        const { email, password } = userWithCorrectPassword;
        const signedInUser = await UserModel.findByCredentials(email, password);
        expect(signedInUser).not.toEqual(null);
        expect(signedInUser?.email).toEqual(email);
    });
    it("finds user by token", async () => {
        const mockToken = "mockToken";
        (JWT.verify as jest.Mock).mockReturnValue({ _id: userId, access: "user" });
        const userBytoken = await UserModel.findByToken(mockToken);
        expect(userBytoken).not.toEqual(null);
        expect(userBytoken?._id).toEqual(userId);
        expect(userBytoken?.email).toEqual(mockUser.email);
    });
});
