"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const knex_1 = __importDefault(require("../database/knex"));
class VideoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const { user_id } = req.params;
            if (!title) {
                throw new AppError_1.default("Informar o título é obrigatório");
            }
            yield (0, knex_1.default)("videos").insert({ user_id, title, description });
            res.status(201).json({ message: "Video criado com sucesso" });
        });
    }
    ;
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            const checkUserExist = yield (0, knex_1.default)("videos").where({ user_id }).first();
            if (!checkUserExist) {
                throw new AppError_1.default("Usuário não possui vídeos");
            }
            const videos = yield (0, knex_1.default)("videos").where({ user_id }).orderBy("title");
            res.status(200).json(videos);
        });
    }
    ;
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.query;
            const videos = yield (0, knex_1.default)("videos")
                .whereLike("videos.title", `%${search}%`)
                .groupBy("videos.title");
            res.status(200).json(videos);
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { video_id } = req.params;
            if (!video_id) {
                throw new AppError_1.default("Vídeo não localizado");
            }
            yield (0, knex_1.default)("videos").where({ id: video_id }).delete();
            res.status(200).json({ message: "Video deletado com sucesso" });
        });
    }
    ;
}
;
exports.default = VideoController;
