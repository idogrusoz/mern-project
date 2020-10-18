import { Document, Model } from "mongoose";
import { IPostInterface } from "../../interfaces/post.interfaces";

export interface PostDocument extends IPostInterface, Document {}

export interface IPostModel extends Model<PostDocument> {
    findByLikes: (userId: string) => PostDocument[];
}
