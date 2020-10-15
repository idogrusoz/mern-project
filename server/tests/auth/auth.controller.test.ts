jest.mock("../../service/auth.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { BaseUser } from "../../interfaces/user.interfaces";
import { registerNewUser, signInUser } from "../../service/auth.service";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";
import { mockUser } from "../resources/user";

beforeAll(async (done) => {
    done();
});

afterAll(async (done) => {
    await mongoose.disconnect();
    server.close(done);
});
describe("Auth endpoints test", () => {
    it("handles register request", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(false, 200, "", mockUser);
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it("handles register request error", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(
            true,
            401,
            "This email is already in use",
        );
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(401);
        expect(JSON.parse(res.text).message).toEqual(mockSuccessResponse.message);
    });
    it("handles signin request", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(false, 200, "", mockUser);
        (signInUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/signin").send(mockUser);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });
    it("handles signin request error", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(
            true,
            404,
            "This user doesn't exist",
        );
        (signInUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await request(app).post("/api/v1/auth/signin").send(mockUser);
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text).message).toEqual(mockSuccessResponse.message);
    });
});
