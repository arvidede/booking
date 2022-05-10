import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Reservation } from './Reservation'

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

    @OneToMany(() => Reservation, (reservation) => reservation.siteId)
    reservations?: Reservation[]

    constructor(props?: Omit<User, 'id'>) {
        if (props) {
            this.name = props.name
            this.email = props.email
            this.password = props.password
            this.phone = props.phone
        }
    }
}
