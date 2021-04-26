import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../database/entities/Setting";

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {}