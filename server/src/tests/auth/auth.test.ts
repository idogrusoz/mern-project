jest.mock("../../service/auth.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { ServiceResponse, UserInterface } from "../../interfaces/user.interfaces";
import { registerNewUser } from "../../service/auth.service";
import buildServiceResponse from "../../utils/serviceResponse";

const mockUser = {
    displayName: "displayName",
    firstName: "firstName",
    lastName: "lastName",
    email: `tezdsdfesdgf3kt@test.test`,
    password: "password",
};

beforeAll(async (done) => {
    done();
});

afterAll(async (done) => {
    await mongoose.disconnect();
    server.close(done);
});
describe("Post Endpoints", () => {
    it("should create a new user", async () => {
        const mockSuccessResponse: ServiceResponse<UserInterface> = buildServiceResponse(false, 200, "", mockUser);
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
});
