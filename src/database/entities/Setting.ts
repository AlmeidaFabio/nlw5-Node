import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("settings")
export class Setting {
    @PrimaryColumn()
    id:string;

    @Column()
    username:string;

    @Column()
    chat:boolean;

    @CreateDateColumn()
    updated_at:Date;

    @CreateDateColumn()
    created_at:Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}