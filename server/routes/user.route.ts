import { Router } from "express";
import { checkUserName } from "../controllers/user.controller";

const users: Router = Router();

users.route("/username").post(checkUserName);

export default users;
