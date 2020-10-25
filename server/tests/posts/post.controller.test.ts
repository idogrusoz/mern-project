import { deletePost, findLikedPosts, userFeed, handleDislike, handleLike } from "../../service/post.service";
jest.mock("../../utils/tokenExtractor");
jest.mock("../../service/auth.service");
jest.mock("../../service/post.service");
import { mockPostWithId1, mockPostWithId2, mockPostWithId4, mockPostWithId5 } from "../test-resources/post";
import { responseUser2 } from "../test-resources/user";
import request from "supertest";
import { app, server } from "../../app";
import mongoose from "../../config/db";
import { ResponseUser } from "../../interfaces/user.interfaces";
import { verifyToken } from "../../service/auth.service";
import buildServiceResponse, { ServiceResponse } from "../../utils/serviceResponse";
import { tokenExtractor } from "../../utils/tokenExtractor";
import { responseUser } from "../test-resources/user";
import { BasePostDocument } from "../../interfaces/post.interfaces";
import { createPost, getPostById, getPostsByUserId } from "../../service/post.service";

describe("Posts endpoints tests", () => {
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
    it("doesn't allow to add post if not user", async () => {
        const mockSuccessResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(
            false,
            200,
            "",
            mockPostWithId1,
        );
        (createPost as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/posts").send(mockPostWithId1);
        expect(res.status).toBe(401);
    });
    it("adds a new post", async () => {
        auth("1");
        const mockSuccessResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(
            false,
            200,
            "",
            mockPostWithId1,
        );
        (createPost as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.post("/api/v1/posts").send(mockPostWithId1);
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual(mockPostWithId1);
    });
    it("finds post by id", async () => {
        auth("1");
        const mockSuccessResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(
            false,
            200,
            "",
            mockPostWithId2,
        );
        (getPostById as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/posts/postdId2");
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual(mockPostWithId2);
    });
    it("finds all posts of a user", async () => {
        auth("1");
        const mockSuccessResponse: ServiceResponse<Array<BasePostDocument>> = buildServiceResponse(false, 200, "", [
            mockPostWithId4,
            mockPostWithId5,
        ]);
        (getPostsByUserId as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/posts/user/userId2");
        expect(getPostsByUserId).toBeCalledWith("userId2");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(2);
    });
    it("deletes a post", async () => {
        auth("1");
        const mockSuccessResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(
            false,
            200,
            "",
            mockPostWithId2,
        );
        (deletePost as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.delete("/api/v1/posts/postId2");
        expect(res.status).toBe(200);
        expect(res.body.data.textContent).toBe("myPost2");
    });
    it("finds posts by user likes", async () => {
        auth("1");
        const mockSuccessResponse: ServiceResponse<Array<BasePostDocument>> = buildServiceResponse(false, 200, "", [
            mockPostWithId4,
            mockPostWithId5,
        ]);
        (findLikedPosts as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/posts/likedbyuser/userId");
        expect(findLikedPosts).toBeCalledWith("userId");
        expect(res.status).toBe(200);
    });
    it("finds the feed of the user", async () => {
        auth("1");
        const data: BasePostDocument[] = [mockPostWithId1, mockPostWithId2];
        const mockSuccessResponse: ServiceResponse<BasePostDocument[]> = buildServiceResponse(false, 200, "", data);
        (userFeed as jest.Mock).mockReturnValue(Promise.resolve(mockSuccessResponse));
        const res = await api.get("/api/v1/posts/userId/feed");
        expect(userFeed).toBeCalledWith("userId");
        expect(res.status).toBe(200);
    });
    it("returns error if userIds don't match", async () => {
        auth("1");
        const res = await api.get("/api/v1/posts/userId2/feed");
        expect(res.status).toBe(401);
    });
    it("handles like request", async () => {
        auth("1");
        const mockResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(false, 200, "", mockPostWithId1);
        (handleLike as jest.Mock).mockReturnValue(mockResponse);
        const res = await await api.put("/api/v1/posts/postId/like").send({ like: true });
        expect(handleLike).toBeCalledWith("postId", "userId");
        expect(res.status).toBe(200);
    });
    it("handles dislike request", async () => {
        auth("1");
        const mockResponse: ServiceResponse<BasePostDocument> = buildServiceResponse(false, 200, "", mockPostWithId1);
        (handleDislike as jest.Mock).mockReturnValue(mockResponse);
        const res = await await api.put("/api/v1/posts/postId/like").send({ like: false });
        expect(handleDislike).toBeCalledWith("postId", "userId");
        expect(res.status).toBe(200);
    });
});
