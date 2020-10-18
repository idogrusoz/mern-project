import { model } from "mongoose";
import PostSchema from "./post.schema";
import { IPostModel, PostDocument } from "./post.types";

export const PostModel: IPostModel = model<PostDocument, IPostModel>("Post", PostSchema);
