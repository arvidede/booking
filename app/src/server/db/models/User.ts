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

    constructor(props?: Omit<User, 'id'>) {
        if (props) {
            this.name = props.name
            this.email = props.email
            this.password = props.password
            this.phone = props.phone
        }
    }
}
