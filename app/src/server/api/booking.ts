import type { RequestHandler } from '@sveltejs/kit'
import db from 'server/db'
import withAuth from 'server/middleware/withAuth'
import { createBooking } from 'server/utils/booking'

export const get: RequestHandler = withAuth(async () => {
    const data = await db.get()
    return { body: { data } }
})

export const post: RequestHandler = withAuth(async (event) => {
    const data = await event.request.json()
    const booking = createBooking(data)
    await db.set(booking.id, booking.data)
    return { status: 200 }
})
