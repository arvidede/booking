import { DataSource, Repository } from 'typeorm'
import { User } from './models/'

class DB {
    source: DataSource
    users: Repository<User>
    constructor() {
        this.init()
    }

    async init() {
        const db = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            username: 'root',
            password: 'admin',
            database: 'test',
            entities: [User],
            synchronize: true,
            logging: false
        })

        db.initialize()
            .then(() => {
                this.source = db
                this.users = db.getRepository(User)
            })
            .catch((error) => console.error(error))
    }
}

export default new DB()
