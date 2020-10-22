import { deletePost, findLikedPosts, getPostById, getPostsByUserId, updatePost } from "./../service/post.service";
import { Request, Response } from "express";
import { createPost } from "../service/post.service";
import { PostDocument } from "../models/post/post.types";

export const create = async (req: Request, res: Response): Promise<Response> => {
    const newPost = req.body;
    try {
        const { error, message, statusCode, data } = await createPost(newPost);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const getOne = async (req: Request, res: Response): Promise<Response> => {
    const postId = req.params.id;
    try {
        const { error, message, statusCode, data } = await getPostById(postId);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const getByUser = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    try {
        const { error, message, statusCode, data } = await getPostsByUserId(userId);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const updateOne = async (req: Request, res: Response): Promise<Response> => {
    const post: PostDocument = req.body;
    if (post._id !== req.params.id) {
        return res.status(400).json({ message: "Bad request" });
    }
    if (post.author.user_id !== req.body.user._id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { error, message, statusCode, data } = await updatePost(post);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const deleteOne = async (req: Request, res: Response): Promise<Response> => {
    const postId: string = req.params.id;
    try {
        const { error, message, statusCode, data } = await deletePost(postId, req.body.user._id);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};

export const likedPostsByUser = async (req: Request, res: Response): Promise<Response> => {
    const userId: string = req.params.id;
    try {
        const { error, message, statusCode, data } = await findLikedPosts(userId);
        return res.status(statusCode).json({ error, message, data });
    } catch (error) {
        return res.status(500).json({ message: "An error occured :" + error.message });
    }
};
