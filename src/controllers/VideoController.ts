import { Request, Response} from "express";
import AppError from "../utils/AppError";
import knex from "../database/knex";

class VideoController {
    async create(req: Request, res: Response){
        const { title, description } = req.body
        const { user_id } = req.params

        if(!title){
            throw new AppError("Informar o título é obrigatório")
        }
        
        await knex("videos").insert({ user_id, title, description })

        res.status(201).json({message:"Video criado com sucesso"})
    };

    async show(req: Request, res: Response){
        const { user_id } = req.params

        const checkUserExist = await knex("videos").where({user_id}).first()

        if(!checkUserExist){
            throw new AppError("Usuário não possui vídeos")
        }
        
        const videos = await knex("videos").where({user_id}).orderBy("title")

        res.status(200).json(videos)
    };

    async search(req: Request, res: Response){
        const { search } = req.query

        const videos = await knex("videos")
        .whereLike("videos.title", `%${search}%`)
        .groupBy("videos.title")

        res.status(200).json(videos)
    };

    async delete(req: Request, res: Response){
        const { video_id } = req.params

        if(!video_id){
            throw new AppError("Vídeo não localizado")
        }
        
        await knex("videos").where({id: video_id}).delete()

        res.status(200).json({message:"Video deletado com sucesso"})
    };
};

export default VideoController;