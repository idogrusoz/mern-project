import { mockUpdatePost5 } from "./../test-resources/post";
import { PostDocument } from "./../../models/post/post.types";
import { assert } from "console";
import mongoose from "../../config/db";
import { PostModel } from "../../models/post/post.model";
import {
    createPost,
    deletePost,
    findLikedPosts,
    getPostById,
    getPostsByUserId,
    updatePost,
} from "../../service/post.service";
import { MONGO_URI } from "../jest.setup";
import { mockPost1, mockPost2, mockPostWithId1, postsArray } from "../test-resources/post";

describe("Post model test", () => {
    let connection: typeof mongoose;
    let postIds: string[] = [];
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
        const findByUser = jest.fn(() => Promise.reject(new Error()));
        const response = await getPostsByUserId("wrongId");
        expect(response.data?.length).toBe(0);
    });
    it("finds all posts by userId", async () => {
        const response = await getPostsByUserId("userId");
        expect(response.data?.length).toBe(3);
        assert(response.data![0] as PostDocument);
    });
    it("updates and returns new data", async () => {
        const mockUpdatePost = { ...mockUpdatePost5, _id: postIds[4] };
        const response = await updatePost(mockUpdatePost);
        expect(response.data?.createdAt).not.toEqual(response.data?.updatedAt);
        expect(response.data?.textContent).toEqual("myUpdatedPost5");
    });
    it("finds post liked by a user", async () => {
        const response = await findLikedPosts("userId");
        expect(response.data?.length).toBe(2);
    });
    it("doesn't delete a post without ownership", async () => {
        const response = await deletePost(postIds[0], "userId2");
        console.log("response", response);
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
});
