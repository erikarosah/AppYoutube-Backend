import { Router } from "express";
import  userRoutes  from "./user.routes";
import videoRoutes from "./video.routes";
import sessionRoutes from "./session.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/videos", videoRoutes);

export default routes