import { BasePostDocument, IPostInterface } from "../interfaces/post.interfaces";
import { PostModel } from "../models/post/post.model";
import { PostDocument } from "../models/post/post.types";
import buildServiceResponse, { ServiceResponse } from "../utils/serviceResponse";
import { findUserById } from "./user.service";

export const createPost = async (data: IPostInterface): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const post = await addPost(data);
        if (!post) {
            return buildServiceResponse(true, 422, "Creation of new post failed");
        }
        console.log(`Post created with id:${post._id}`);
        return buildServiceResponse(false, 200, "", post);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const addPost = async (post: IPostInterface): Promise<PostDocument | null> => {
    const newPost = await PostModel.create(post);
    return newPost;
};

export const getPostById = async (postId: string): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const post = await findPostById(postId);
        if (!post) {
            return buildServiceResponse(true, 404, "An erroroccured");
        }
        return buildServiceResponse(false, 200, "", post);
    } catch (error) {
        console.log("Error", error);
        return buildServiceResponse(true, 500, error.message);
    }
};

const findPostById = async (postId: string): Promise<PostDocument | null> => {
    const post = await PostModel.findById(postId);
    return post;
};

export const getPostsByUserId = async (user_id: string): Promise<ServiceResponse<Array<BasePostDocument>>> => {
    try {
        const posts = await findByUser(user_id);
        return buildServiceResponse(false, 200, "", posts);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const findByUser = async (user_id: string): Promise<Array<PostDocument>> => {
    const posts = await PostModel.find({ "author.user_id": user_id }).sort({ updatedAt: "desc" });
    return posts;
};

export const handleLike = async (postId: string, userId: string): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const result = await addLikeToPost(postId, userId);
        if (!result) {
            return buildServiceResponse(true, 422, "Couldn't update the post");
        }
        console.log(`User: ${userId} liked the Post: ${postId}`);
        return buildServiceResponse(false, 200, "", result);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const addLikeToPost = async (postId: string, userId: string): Promise<PostDocument | null> => {
    const result = await PostModel.findByIdAndUpdate({ _id: postId }, { $addToSet: { likes: userId } }, { new: true });
    return result;
};

export const handleDislike = async (postId: string, userId: string): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const result = await removeLikeFromPost(postId, userId);
        if (!result) {
            return buildServiceResponse(true, 422, "Couldn't update the post");
        }
        console.log(`User: ${userId} removed the like from the Post: ${postId}`);
        return buildServiceResponse(false, 200, "", result);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const removeLikeFromPost = async (postId: string, userId: string): Promise<PostDocument | null> => {
    const result = await PostModel.findByIdAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true });
    return result;
};

export const deletePost = async (postId: string, userId: string): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const result = await findAndDelete(postId, userId);
        if (!result) {
            return buildServiceResponse(true, 404, "Post not found");
        }
        console.log(`Post:${result._id} is deleted`);
        return buildServiceResponse(false, 200, "", result);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const findAndDelete = async (_id: string, user_id: string): Promise<PostDocument | null> => {
    const result = await PostModel.findOneAndDelete({ _id, "author.user_id": user_id });
    return result;
};

export const findLikedPosts = async (userId: string): Promise<ServiceResponse<Array<BasePostDocument>>> => {
    try {
        const posts = await findByLikes(userId);
        return buildServiceResponse(false, 200, "", posts);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const findByLikes = async (userId: string): Promise<Array<PostDocument>> => {
    const result = await PostModel.findByLikes(userId);
    return result;
};

export const userFeed = async (userId: string): Promise<ServiceResponse<BasePostDocument[]>> => {
    try {
        const user = await findUserById(userId);
        if (user && user.following) {
            const posts = await getUserFeed(user.following);
            return buildServiceResponse(false, 200, "", posts);
        }
        return buildServiceResponse(true, 400, "No users followed");
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const getUserFeed = async (followed: string[]): Promise<PostDocument[]> => {
    return await PostModel.find({ "author.user_id": { $in: followed } }).sort({ createdAt: "desc" });
};
