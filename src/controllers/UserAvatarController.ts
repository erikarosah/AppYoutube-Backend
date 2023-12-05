import { Request, Response } from "express";
import knex from "../database/knex";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";

class UserAvatarController {
    async update(req: any, res:Response){
        const  user_id  = req.user.id

        const avatarFilename = req.file?.filename

        const diskStorage = new DiskStorage()

        const user = await knex("users").where({id: user_id}).first()

        if(!user){
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = filename;

        await knex("users").update(user).where({id: user_id})

        return res.status(200).json(user)
    }
}

export default UserAvatarController;