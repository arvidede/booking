import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    constructor({ name, email, password }: Omit<User, 'id'>) {
        this.name = name
        this.email = email
        this.password = password
    }
}
