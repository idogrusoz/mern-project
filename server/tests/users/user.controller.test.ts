jest.mock("../../service/user.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { isUserNameFree } from "../../service/user.service";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";

describe("Auth endpoints test", () => {
    const api = request(app);
    beforeAll(async (done) => {
        done();
    });

    afterAll(async (done) => {
        await mongoose.disconnect();
        await server.close(done);
    });
    it("handles check username request", async () => {
        const mockSuccessResponse: ServiceResponse<boolean> = buildServiceResponse(false, 200, "", true);
        (isUserNameFree as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/users/username").send("username");
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("data");
    });
});
