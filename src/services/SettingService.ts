import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../database/entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export class SettingService {
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }
    
    async create({ chat, username } : ISettingsCreate) {
        const userExists = await this.settingsRepository.findOne({username});

        if(userExists) {
            throw new Error("User already exists!");
        }
    
        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);
        
        return settings;
    }

    async findByUsername(username:string) {
        const settings = await this.settingsRepository.findOne({username})

        return settings;
    }

    async update(username:string, chat:boolean) {
        await this.settingsRepository.createQueryBuilder()
        .update(Setting)
        .set({chat})
        .where("username = :username", {username})
        .execute();
    }
}