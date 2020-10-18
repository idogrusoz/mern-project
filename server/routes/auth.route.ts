import { signIn, register, authenticate, signOut } from "./../controllers/auth.controller";
import { Router } from "express";
import { verification } from "../middlewares/auth.middleware";

const auth: Router = Router();

auth.route("/signout").get(signOut);
auth.route("/register").post(register);
auth.route("/signin").post(signIn);
auth.route("/authenticate").get(verification, authenticate);

export default auth;
