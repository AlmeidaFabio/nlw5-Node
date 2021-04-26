import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UsersController {
    async create(request:Request, response:Response) {
        const usersService = new UserService();
        const {email} = request.body;

        try {
            const user = await usersService.create(email);

            return response.status(201).json(user);
        } catch (err) {
            return response.status(400).json({error:err.message});
        }
    }
}