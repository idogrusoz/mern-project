import { deleteOne, feed, getByUser, likedPostsByUser, like } from "./../controllers/post.controller";
import { Router } from "express";
import { create, getOne } from "../controllers/post.controller";
import { verification } from "../middlewares/auth.middleware";

const posts: Router = Router();

posts.route("/:id").get(verification, getOne);
posts.route("/user/:id").get(verification, getByUser);
posts.route("/likedbyuser/:id").get(verification, likedPostsByUser);
posts.route("/:userId/feed").get(verification, feed);
posts.route("/").post(verification, create);
posts.route("/:id/like").put(verification, like);
posts.route("/:id").delete(verification, deleteOne);

export default posts;
