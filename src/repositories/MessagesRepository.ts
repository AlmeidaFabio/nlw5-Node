import { EntityRepository, Repository } from "typeorm";
import { Message } from "../database/entities/Message";

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}