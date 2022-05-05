import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    name: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @Column('text')
    phone: string

    constructor({ name, email, password, phone }: Omit<User, 'id'>) {
        this.name = name
        this.email = email
        this.password = password
        this.phone = phone
    }
}
