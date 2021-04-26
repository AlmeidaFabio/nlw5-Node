import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity("connections")
export class Connection {
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
    socket_id:string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}