import { Router } from "express";
import { register } from "../controllers/auth.controller";

const auth: Router = Router();

auth.route("/register").post(register);

export default auth;
