import { Router } from "express";
import auth from "./auth.route";

const routes: Router = Router();

routes.use("/api/v1/auth", auth);

export default routes;
