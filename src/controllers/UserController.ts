import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { hash, compare } from "bcryptjs";
import knex from "../database/knex";

class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body

        const checkEmailExist = await knex("users").where({email})
 
        if(checkEmailExist.length > 0){
            throw new AppError("Este e-mail já está sendo utilizado")
        }
    
        if(!name || !email || !password){
            throw new AppError("Preencha todos os campos")
        }

        const hashedPassword = await hash(password, 8)
        
        await knex("users").insert({name, email, password: hashedPassword})

        res.status(201).json({message:"Usuário criado com sucesso"})
    };

    async update(req: any, res: Response){
        const { name, email, password, old_password } = req.body;
        const  user_id  = req.user.id

        const user = await knex("users").where({id: user_id}).first()

        if(!user){
            throw new AppError("Usuário não localizado")
        }

        const checkEmailExistInDatabase = await knex("users").where({email}).first()

        if(checkEmailExistInDatabase && checkEmailExistInDatabase.id !== user_id){
            throw new AppError("Este e-mail já está sendo utilizado")
        }

        if(password && !old_password){
            throw new AppError("Necessário informar a senha antiga para atualizar")
        }

        const matchedPassword = await compare(old_password, user.password)

        if(!matchedPassword){
            throw new AppError("Senha antiga informada incorretamente")
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").where({id: user_id})
        .update({
            name: name ?? user.name,
            email: email ?? user.email,
            password: hashedPassword,
        })

        res.status(200).json({message:"Dados atualizados com sucesso"})
    };
};

export default UserController;