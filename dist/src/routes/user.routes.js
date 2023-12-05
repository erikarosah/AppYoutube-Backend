"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
const upload_1 = require("../configs/upload");
const multer_1 = __importDefault(require("multer"));
const ensureAuthenticated_1 = __importDefault(require("../middleware/ensureAuthenticated"));
const userRoutes = (0, express_1.Router)();
const userController = new UserController_1.default();
const userAvatarController = new UserAvatarController_1.default();
const upload = (0, multer_1.default)(upload_1.uploadConfig.MULTER);
userRoutes.post('/', userController.create);
userRoutes.put('/', ensureAuthenticated_1.default, userController.update);
userRoutes.patch('/avatar', ensureAuthenticated_1.default, upload.single("avatar"), userAvatarController.update);
exports.default = userRoutes;
