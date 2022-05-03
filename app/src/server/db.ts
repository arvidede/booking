import { v4 as uuid } from 'uuid'

const DATA = new Map()

class DB {
    constructor() {
        Array(10)
            .fill(null)
            .forEach((_, i) => DATA.set(uuid(), `Bokning ${i + 1}`))
    }

    async get(key?: string) {
        if (!key) return Array.from(DATA.values())
        return DATA.get(key) || null
    }

    async set(key: string, value: string) {
        DATA.set(key, value)
        return true
    }

    async delete(key: string) {
        DATA.delete(key)
        return true
    }
}

export default new DB()
