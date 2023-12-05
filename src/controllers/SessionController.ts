import { Request, Response } from "express";
import knex from "../database/knex";
import AppError from "../utils/AppError";
import authConfig from "../configs/auth";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class SessionController{
    async create(req: Request, res: Response){
        const { email, password } = req.body  

        const user = await knex("users").where({email}).first()

        if(!user){
            throw new AppError("E-mail e/ou senha inválidos", 401)
        }

        const checkPassword = await compare(password, user.password)

        if(!checkPassword){
            throw new AppError("E-mail e/ou senha inválidos", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        delete user.password
        
        return res.status(200).json({user, token})
    }
};

export default SessionController;