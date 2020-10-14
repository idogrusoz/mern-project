jest.mock("../../service/auth.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { ServiceResponse, UserInterface } from "../../interfaces/user.interfaces";
import { registerNewUser } from "../../service/auth.service";
import buildServiceResponse from "../../utils/serviceResponse";
import { mockUser } from "../resources/user";

beforeAll(async (done) => {
    done();
});

afterAll(async (done) => {
    await mongoose.disconnect();
    server.close(done);
});
describe("Auth Endpoints", () => {
    it("register endpoint returns successful response", async () => {
        const mockSuccessResponse: ServiceResponse<UserInterface> = buildServiceResponse(false, 200, "", mockUser);
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it("register endpoint handles error", async () => {
        const mockSuccessResponse: ServiceResponse<UserInterface> = buildServiceResponse(
            true,
            401,
            "This email is already in use",
        );
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(401);
        expect(JSON.parse(res.text).message).toEqual(mockSuccessResponse.message);
    });
});
