"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const video_routes_1 = __importDefault(require("./video.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
const routes = (0, express_1.Router)();
routes.use("/users", user_routes_1.default);
routes.use("/session", session_routes_1.default);
routes.use("/videos", video_routes_1.default);
exports.default = routes;
