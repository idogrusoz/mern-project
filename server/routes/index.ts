import { Router } from "express";
import auth from "./auth.route";
import posts from "./post.route";

const routes: Router = Router();

routes.use("/api/v1/auth", auth);
routes.use("/api/v1/posts", posts);

export default routes;
