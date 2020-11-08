import { Router } from "express";
import * as swaggerdocument from "../swagger.json";
import swaggerUI from "swagger-ui-express";
import path from "path";
import auth from "./auth.route";
import posts from "./post.route";
import users from "./user.route";

const routes: Router = Router();

routes.use("/api/v1/auth", auth);
routes.use("/api/v1/posts", posts);
routes.use("/api/v1/users", users);

routes.use("/api/v1/swagger", swaggerUI.serve, swaggerUI.setup(swaggerdocument));

routes.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/"));
});

export default routes;
