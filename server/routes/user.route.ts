import { Router } from "express";
import { checkUserName, searchUser } from "../controllers/user.controller";

const users: Router = Router();

users.route("/username").post(checkUserName);
users.route("/search/:term").get(searchUser);

export default users;
