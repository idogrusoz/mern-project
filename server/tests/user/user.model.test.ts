import { userWithCorrectPassword } from "./../resources/user";
import { UserModel } from "./../../models/user/user.model";
import mongoose from "../../config/db";
import { mockUser } from "../resources/user";
import { MONGO_URI } from "../jest.setup";

describe("insert", () => {
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

    it("should insert a doc into collection", async () => {
        await UserModel.create(mockUser);
        const insertedUser = await UserModel.findOne({ email: mockUser.email });
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
});
