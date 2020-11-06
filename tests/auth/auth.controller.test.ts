jest.mock("../../service/auth.service");
jest.mock("../../utils/tokenExtractor");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { BaseUser, ResponseUser } from "../../interfaces/user.interfaces";
import { registerNewUser, signInUser, verifyToken } from "../../service/auth.service";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";
import { tokenExtractor } from "../../utils/tokenExtractor";
import { mockUser, responseUser } from "../test-resources/user";

describe("Auth endpoints test", () => {
    const api = request(app);
    beforeAll(async (done) => {
        done();
    });

    afterAll(async (done) => {
        await mongoose.disconnect();
        await server.close(done);
    });
    it("handles register request", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(false, 200, "", mockUser);
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/auth/register").send(mockUser);
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
        const res = await api.post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(401);
        expect(JSON.parse(res.text).message).toEqual(mockSuccessResponse.message);
    });
    it("handles error thrown by service on register", async () => {
        (registerNewUser as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.post("/api/v1/auth/register").send(mockUser);
        expect(res.status).toEqual(500);
    });
    it("handles signin request", async () => {
        const mockSuccessResponse: ServiceResponse<BaseUser> = buildServiceResponse(false, 200, "", mockUser);
        (signInUser as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/auth/signin").send(mockUser);
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
        const res = await api.post("/api/v1/auth/signin").send(mockUser);
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text).message).toEqual(mockSuccessResponse.message);
    });
    it("handles error thrown by service on signin", async () => {
        (signInUser as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.post("/api/v1/auth/signin").send(mockUser);
        expect(res.status).toEqual(500);
    });
    it("empty token can not pass middleware", async () => {
        const res = await api.get("/api/v1/auth/authenticate");
        expect(res.status).toEqual(401);
    });
    it("calls next function if token is provided", async () => {
        (tokenExtractor as jest.Mock).mockReturnValue("x");
        const mockSuccessResponse: ServiceResponse<ResponseUser> = buildServiceResponse(false, 200, "", responseUser);
        (verifyToken as jest.Mock).mockReturnValue(mockSuccessResponse);
        const res = await api.get("/api/v1/auth/authenticate");
        expect(res.status).toEqual(200);
    });
    it("handles error during token verification", async () => {
        (tokenExtractor as jest.Mock).mockReturnValue("x");
        const mockSuccessResponse: ServiceResponse<ResponseUser> = buildServiceResponse(true, 500, "", responseUser);
        (verifyToken as jest.Mock).mockReturnValue(mockSuccessResponse);
        const res = await api.get("/api/v1/auth/authenticate");
        expect(res.status).toEqual(500);
    });
    it("signs a user out", async () => {
        (tokenExtractor as jest.Mock).mockReturnValue("x");
        const mockSuccessResponse: ServiceResponse<ResponseUser> = buildServiceResponse(false, 200, "", responseUser);
        (verifyToken as jest.Mock).mockReturnValue(mockSuccessResponse);
        const res = await api.get("/api/v1/auth/signout");
        expect(res.status).toEqual(200);
        expect(res.body.isAuthenticted).not.toBeTruthy();
    });
});
