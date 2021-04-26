import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity("messages")
export class Message {
    @PrimaryColumn()
    id:string;

    @Column()
    admin_id: string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User;

    @Column()
    text:string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}