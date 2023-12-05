import { Router } from "express";
import  UserController  from "../controllers/UserController";
import UserAvatarController from "../controllers/UserAvatarController";
import { uploadConfig } from "../configs/upload";
import multer from "multer";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER);

userRoutes.post('/', userController.create);
userRoutes.put('/:user_id', ensureAuthenticated,  userController.update);
userRoutes.patch('/avatar/:user_id', ensureAuthenticated,  upload.single("avatar"), userAvatarController.update);


export default userRoutes;