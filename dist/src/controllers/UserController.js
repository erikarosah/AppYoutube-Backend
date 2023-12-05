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
const bcryptjs_1 = require("bcryptjs");
const knex_1 = __importDefault(require("../database/knex"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const checkEmailExist = yield (0, knex_1.default)("users").where({ email });
            if (checkEmailExist.length > 0) {
                throw new AppError_1.default("Este e-mail já está sendo utilizado");
            }
            if (!name || !email || !password) {
                throw new AppError_1.default("Preencha todos os campos");
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
            yield (0, knex_1.default)("users").insert({ name, email, password: hashedPassword });
            res.status(201).json({ message: "Usuário criado com sucesso" });
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, old_password } = req.body;
            const user_id = req.user.id;
            const user = yield (0, knex_1.default)("users").where({ id: user_id }).first();
            if (!user) {
                throw new AppError_1.default("Usuário não localizado");
            }
            const checkEmailExistInDatabase = yield (0, knex_1.default)("users").where({ email }).first();
            if (checkEmailExistInDatabase && checkEmailExistInDatabase.id !== user_id) {
                throw new AppError_1.default("Este e-mail já está sendo utilizado");
            }
            if (password && !old_password) {
                throw new AppError_1.default("Necessário informar a senha antiga para atualizar");
            }
            const matchedPassword = yield (0, bcryptjs_1.compare)(old_password, user.password);
            if (!matchedPassword) {
                throw new AppError_1.default("Senha antiga informada incorretamente");
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
            yield (0, knex_1.default)("users").where({ id: user_id })
                .update({
                name: name !== null && name !== void 0 ? name : user.name,
                email: email !== null && email !== void 0 ? email : user.email,
                password: hashedPassword,
            });
            res.status(200).json({ message: "Dados atualizados com sucesso" });
        });
    }
    ;
}
;
exports.default = UserController;
