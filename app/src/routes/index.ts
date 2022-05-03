import type { RequestHandler } from '@sveltejs/kit'
import db from 'server/db'

export const get: RequestHandler = async () => {
    const bookings = await db.get()
    return {
        body: {
            bookings
        }
    }
}
