import { Request, Response } from "express";
import { SettingService } from "../services/SettingService";

export class SettingsController {
    async create(request:Request, response:Response) {
        const { chat, username } = request.body;
        const settingsService = new SettingService();

        try {
            const settings = await settingsService.create({
                chat,
                username
            });

            return response.status(201).json(settings);
        } catch (err) {
            return response.status(400).json({error:err.message});
        }
    }

    async findByUsername(request:Request, response:Response) {
        const { username } = request.params;

        const settingsService = new SettingService();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings);
    }

    async update(request:Request, response:Response) {
        const {username} = request.params;
        const {chat} = request.body;
        const settingsService = new SettingService();

        try {
            const settings = await settingsService.update(username, chat);

            return response.json(settings)
        } catch (err) {
            return response.status(400).json({error:err.message});
        }
    }
}