import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    name: string

    @Column('text')
    email: string

    @Column('text')
    phone: string

    @ManyToOne(() => User, (user) => user.reservations)
    siteId: string

    constructor(props?: Omit<Reservation, 'id'>) {
        if (props) {
            this.name = props.name
            this.email = props.email
            this.phone = props.phone
            this.siteId = props.siteId
        }
    }
}
