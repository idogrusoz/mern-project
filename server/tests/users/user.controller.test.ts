jest.mock("../../service/user.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { SearchedUser } from "../../interfaces/user.interfaces";
import { isUserNameFree, search } from "../../service/user.service";
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
    it("handles search request", async () => {
        const mockSuccessResponse: ServiceResponse<SearchedUser[]> = buildServiceResponse(false, 200, "", [
            { userName: "userName", _id: "userId", image: "img" },
        ]);
        (search as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/users/search/mocksearch");
        expect(search).toBeCalledWith("mocksearch");
        expect(res.status).toEqual(200);
    });
});
