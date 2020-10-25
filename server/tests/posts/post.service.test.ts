import { handleDislike, handleLike, userFeed } from "./../../service/post.service";
import { mockUpdatePost5 } from "../test-resources/post";
import { PostDocument } from "../../models/post/post.types";
import { assert } from "console";
import mongoose from "../../config/db";
import { PostModel } from "../../models/post/post.model";
import { createPost, deletePost, findLikedPosts, getPostById, getPostsByUserId } from "../../service/post.service";
import { MONGO_URI } from "../jest.setup";
import { mockPost1, mockPost2, mockPostWithId1, postsArray } from "../test-resources/post";
import { mockUsersArray } from "../test-resources/user";
import { UserModel } from "../../models/user/user.model";

describe("Post model test", () => {
    let connection: typeof mongoose;
    let postIds: string[] = [];
    const userIds: string[] = [];

    beforeAll(async () => {
        connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
        for (let i = 0; i < postsArray.length; i++) {
            const post = await PostModel.create(postsArray[i]);
            postIds.push(post._id);
        }
    });

    afterAll(async () => {
        await PostModel.deleteMany({});
        await UserModel.deleteMany({});
        await connection.disconnect();
    });
    it("handles error if post creation fails", async () => {
        const response = await createPost(mockPostWithId1);
        expect(response.statusCode).toEqual(500);
    });
    it("creates  new post and returns it", async () => {
        const response = await createPost(mockPost1);
        postIds.unshift(response.data!._id);
        expect(response.data?.textContent).toEqual(mockPost1.textContent);
        assert(response.data as PostDocument);
    });
    it("finds a post by id", async () => {
        const response = await getPostById(postIds[1]);
        expect(response.data?.textContent).toEqual(mockPost2.textContent);
        assert(response.data as PostDocument);
    });
    it("handles wrong userId", async () => {
        const response = await getPostsByUserId("wrongId");
        expect(response.data?.length).toBe(0);
    });
    it("finds all posts by userId", async () => {
        const response = await getPostsByUserId("userId");
        expect(response.data?.length).toBe(3);
        assert(response.data![0] as PostDocument);
    });
    it("finds post liked by a user", async () => {
        const response = await findLikedPosts("userId");
        expect(response.data?.length).toBe(2);
    });
    it("doesn't delete a post without ownership", async () => {
        const response = await deletePost(postIds[0], "userId2");
        expect(response.statusCode).toEqual(404);
    });
    it("deletes a post by id", async () => {
        const response = await deletePost(postIds[0], "userId");
        expect(response.data?._id).toEqual(postIds[0]);
    });
    it("handles error if post is not found", async () => {
        const response = await getPostById(postIds[0]);
        expect(response.statusCode).toEqual(404);
    });
    it("finds the posts of the followed users", async () => {
        for (let i = 0; i < 2; i++) {
            await UserModel.create(mockUsersArray[i]);
            const user = await UserModel.findOne({ email: mockUsersArray[i].email });
            userIds.push(user?._id);
        }
        const response1 = await userFeed(userIds[0]);
        const response2 = await userFeed(userIds[1]);
        expect(response1.data).toHaveLength(4);
        expect(response2.data).toHaveLength(2);
    });
    it("adds like for the post", async () => {
        const response = await handleLike(postIds[1], userIds[1]);
        expect(response.data).toBeTruthy();
        expect(response.data?.likes.indexOf(userIds[1])).not.toBe(-1);
    });
    it("removes like from the post", async () => {
        const response = await handleDislike(postIds[1], userIds[1]);
        expect(response.data).toBeTruthy();
        expect(response.data?.likes.indexOf(userIds[1])).toBe(-1);
    });
});
