import { Router } from "express";
import auth from "./auth.route";
import posts from "./post.route";
import users from "./user.route";

const routes: Router = Router();

routes.use("/api/v1/auth", auth);
routes.use("/api/v1/posts", posts);
routes.use("/api/v1/users", users);

export default routes;
