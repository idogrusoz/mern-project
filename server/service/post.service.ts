import { BasePostDocument, IPostInterface } from "../interfaces/post.interfaces";
import { PostModel } from "../models/post/post.model";
import { PostDocument } from "../models/post/post.types";
import buildServiceResponse, { ServiceResponse } from "../utils/serviceResponse";

export const createPost = async (data: IPostInterface): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const post = await addPost(data);
        if (!post) {
            return buildServiceResponse(true, 422, "Creation of new post failed");
        }
        console.log(`Post created with id:${post._id}`);
        return buildServiceResponse(false, 200, "", post);
    } catch (error) {
        // console.log("Error", error);
        return buildServiceResponse(true, 500, error.message);
    }
};

const addPost = async (post: IPostInterface): Promise<PostDocument | null> => {
    const newPost = await PostModel.create(post);
    return newPost;
};

export const getPostById = async (postId: string): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const post = await findById(postId);
        if (!post) {
            return buildServiceResponse(true, 404, "An erroroccured");
        }
        return buildServiceResponse(false, 200, "", post);
    } catch (error) {
        console.log("Error", error);
        return buildServiceResponse(true, 500, error.message);
    }
};

const findById = async (postId: string): Promise<PostDocument | null> => {
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
    const posts = await PostModel.find({ user_id });
    return posts;
};

export const updatePost = async (data: BasePostDocument): Promise<ServiceResponse<BasePostDocument>> => {
    try {
        const result = await findAndUpdate(data);
        if (!result) {
            return buildServiceResponse(true, 422, "Couldn't update the post");
        }
        console.log(`Post:${data._id} is updated`);
        return buildServiceResponse(false, 200, "", result);
    } catch (error) {
        return buildServiceResponse(true, 500, error.message);
    }
};

const findAndUpdate = async (data: BasePostDocument): Promise<PostDocument | null> => {
    const result = await PostModel.findByIdAndUpdate(data._id, data, { new: true });
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
    const result = await PostModel.findOneAndDelete({ _id, user_id });
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
