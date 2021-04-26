import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessagesController {
    async create(request:Request, response:Response) {
        const messageService = new MessageService();

        const {admin_id, text, user_id} = request.body;

        try {
            const message = await messageService.create({
                admin_id,
                text,
                user_id
            })

            return response.status(201).json(message)
        } catch (err) {
            return response.status(400).json({error: err.message})
        }
    }

    async showByUser(request:Request, response:Response) {
        const messageService = new MessageService();

        const user_id = request.params.id

        try {
            const list = await messageService.listByUser(user_id)

            return response.json(list)
        } catch (err) {
            return response.status(400).json({error: err.message})
        }
    }
}