import { EntityRepository, Repository } from "typeorm";
import {Connection} from '../database/entities/Connection'

@EntityRepository(Connection)
export class ConnectionRepository extends Repository<Connection> {}