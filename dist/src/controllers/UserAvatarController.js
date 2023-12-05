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
const knex_1 = __importDefault(require("../database/knex"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const DiskStorage_1 = __importDefault(require("../providers/DiskStorage"));
class UserAvatarController {
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.id;
            const avatarFilename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const diskStorage = new DiskStorage_1.default();
            const user = yield (0, knex_1.default)("users").where({ id: user_id }).first();
            if (!user) {
                throw new AppError_1.default("Somente usuários autenticados podem mudar o avatar", 401);
            }
            if (user.avatar) {
                yield diskStorage.deleteFile(user.avatar);
            }
            const filename = yield diskStorage.saveFile(avatarFilename);
            user.avatar = filename;
            yield (0, knex_1.default)("users").update(user).where({ id: user_id });
            return res.status(200).json(user);
        });
    }
}
exports.default = UserAvatarController;
