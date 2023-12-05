"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VideoController_1 = __importDefault(require("../controllers/VideoController"));
const ensureAuthenticated_1 = __importDefault(require("../middleware/ensureAuthenticated"));
const videoRoutes = (0, express_1.Router)();
const videoController = new VideoController_1.default();
videoRoutes.post('/:user_id', ensureAuthenticated_1.default, videoController.create);
videoRoutes.get('/:user_id', ensureAuthenticated_1.default, videoController.show);
videoRoutes.get('/', videoController.search);
videoRoutes.delete('/:video_id', ensureAuthenticated_1.default, videoController.delete);
exports.default = videoRoutes;
