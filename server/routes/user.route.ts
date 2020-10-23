import { follow, unFollow } from "./../controllers/user.controller";
import { Router } from "express";
import { checkUserName, searchUser } from "../controllers/user.controller";
import { verification } from "../middlewares/auth.middleware";

const users: Router = Router();

users.route("/username").post(checkUserName);
users.route("/search/:term").get(searchUser);
users.route("/:id/follow").get(verification, follow);
users.route("/:id/unfollow").get(verification, unFollow);

export default users;
