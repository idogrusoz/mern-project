jest.mock("../../service/user.service");
jest.mock("../../utils/tokenExtractor");
jest.mock("../../service/auth.service");
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { ResponseUser, SearchedUser } from "../../interfaces/user.interfaces";
import { verifyToken } from "../../service/auth.service";
import { findOneUser, followUser, isUserNameFree, search, unFollowUser } from "../../service/user.service";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";
import { tokenExtractor } from "../../utils/tokenExtractor";
import { responseUser, responseUser2 } from "../test-resources/user";

describe("Auth endpoints test", () => {
    const api = request(app);
    beforeAll(async (done) => {
        done();
    });

    afterAll(async (done) => {
        await mongoose.disconnect();
        await server.close(done);
        jest.clearAllMocks();
    });
    const auth = (id: "1" | "2") => {
        (tokenExtractor as jest.Mock).mockReturnValue("x");
        const mockSuccessResponse: ServiceResponse<ResponseUser> = buildServiceResponse(
            false,
            200,
            "",
            id === "1" ? responseUser : responseUser2,
        );
        (verifyToken as jest.Mock).mockReturnValue(mockSuccessResponse);
    };
    const mockSingleUserResponse: ServiceResponse<SearchedUser> = buildServiceResponse(false, 200, "", {
        userName: "userName",
        _id: "userId2",
        image: "img",
        displayName: "displayName",
        followers: [],
        following: [],
    });
    it("handles check username request", async () => {
        const mockSuccessResponse: ServiceResponse<boolean> = buildServiceResponse(false, 200, "", true);
        (isUserNameFree as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/users/username").send("username");
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("data");
    });
    it("handles error thrown while checking user name", async () => {
        (isUserNameFree as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.post("/api/v1/users/username").send("username");
        expect(res.status).toEqual(500);
    });
    it("handles search request", async () => {
        const mockSuccessResponse: ServiceResponse<SearchedUser[]> = buildServiceResponse(false, 200, "", [
            { userName: "userName", _id: "userId", image: "img", displayName: "displayName" },
        ]);
        (search as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/users/search/mocksearch");
        expect(search).toBeCalledWith("mocksearch");
        expect(res.status).toEqual(200);
    });
    it("handles error thrown during search request", async () => {
        (search as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.get("/api/v1/users/search/mocksearch");
        expect(search).toBeCalledWith("mocksearch");
        expect(res.status).toEqual(500);
    });
    it("handles follow request", async () => {
        auth("1");
        (followUser as jest.Mock).mockReturnValue(Promise.resolve(mockSingleUserResponse));
        const res = await api.put("/api/v1/users/userId2/follow");
        expect(followUser).toBeCalledWith("userId", "userId2");
        expect(res.status).toEqual(200);
    });
    it("handles error thrown during follow request", async () => {
        auth("1");
        (followUser as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.put("/api/v1/users/userId2/follow");
        expect(followUser).toBeCalledWith("userId", "userId2");
        expect(res.status).toEqual(500);
    });
    it("handles unfollow request", async () => {
        auth("1");
        (unFollowUser as jest.Mock).mockReturnValue(Promise.resolve(mockSingleUserResponse));
        const res = await api.put("/api/v1/users/userId2/unfollow");
        expect(unFollowUser).toBeCalledWith("userId", "userId2");
        expect(res.status).toEqual(200);
    });
    it("handles error thrown during unfollow request", async () => {
        auth("1");
        (unFollowUser as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.put("/api/v1/users/userId2/unfollow");
        expect(unFollowUser).toBeCalledWith("userId", "userId2");
        expect(res.status).toEqual(500);
    });
    it("handles find user request", async () => {
        auth("1");
        (findOneUser as jest.Mock).mockReturnValue(Promise.resolve(mockSingleUserResponse));
        const res = await api.get("/api/v1/users/userId2");
        expect(findOneUser).toBeCalledWith("userId2");
        expect(res.status).toBe(200);
    });
    it("handles error throw while finding a user by id", async () => {
        auth("1");
        (findOneUser as jest.Mock).mockReturnValue(Promise.resolve(new Error()));
        const res = await api.get("/api/v1/users/userId2");
        expect(findOneUser).toBeCalledWith("userId2");
        expect(res.status).toBe(500);
    });
});
