"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("dotenv/config");
const AppError_1 = __importDefault(require("./utils/AppError"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message
        });
    }
    console.log(err);
    return res.status(500).json({
        status: "Error",
        message: "Internal server error"
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
