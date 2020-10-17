import { signIn, register, authenticate } from "./../controllers/auth.controller";
import { Router } from "express";
import { verification } from "../middlewares/auth.middleware";
// import { register } from "../controllers/auth.controller";

const auth: Router = Router();

auth.route("/register").post(register);
auth.route("/signin").post(signIn);
auth.route("/authenticate").get(verification, authenticate);

export default auth;
