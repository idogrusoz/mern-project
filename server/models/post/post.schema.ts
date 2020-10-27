import { PostDocument } from "./post.types";
import { Schema } from "mongoose";

const PostSchema = new Schema({
    author: {
        user_id: {
            type: String,
            indexes: true,
            required: true,
        },
        userName: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    textContent: {
        type: String,
    },
    style: {
        fontFamily: {
            type: String,
        },
        fontSize: {
            type: Number,
        },
        fontWeight: {
            type: Number,
        },
        backgroundColor: {
            type: String,
        },
        textAlign: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    likes: [{ type: String, uniqueItems: true }],

    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

PostSchema.statics.findByLikes = function (userId: string) {
    var Post = this;
    return Post.find({ likes: userId });
};

PostSchema.pre<PostDocument>("save", function (this: PostDocument, next) {
    var post = this;
    if (!post.createdAt) {
        post.createdAt = new Date();
        return next();
    }
    if (!post.isModified("likes")) {
        post.updatedAt = new Date();
        return next();
    }
});

export default PostSchema;
