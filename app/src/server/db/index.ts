import 'reflect-metadata'
import { DataSource, Repository } from 'typeorm'
import { User, Reservation } from './models/'

class DB {
    source: DataSource
    users: Repository<User>
    reservations: Repository<Reservation>
    constructor() {
        this.init()
    }

    async init() {
        const db = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            username: 'arvid',
            password: '',
            database: 'arvid',
            entities: [User, Reservation],
            synchronize: true,
            logging: false
        })
        this.source = db
        this.users = db.getRepository(User)
        this.reservations = db.getRepository(Reservation)

        await this.source
            .initialize()
            .then(() => {
                console.log('DB initialized')
            })
            .catch((error) => console.error('DB:', error))
    }
}

export default new DB()
