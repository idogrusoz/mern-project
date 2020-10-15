import { signIn } from "./../controllers/auth.controller";
import { Router } from "express";
import { register } from "../controllers/auth.controller";

const auth: Router = Router();

auth.route("/register").post(register);
auth.route("/signin").post(signIn);

export default auth;
