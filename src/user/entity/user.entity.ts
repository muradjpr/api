import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password =await bcrypt.hashSync(this.password, salt)
    }
}