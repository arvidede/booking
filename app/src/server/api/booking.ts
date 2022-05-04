import type { RequestHandler } from '@sveltejs/kit'
import withAuth from 'server/middleware/withAuth'

export const get: RequestHandler = withAuth(async () => {
    return { body: { data: [] } }
})

export const post: RequestHandler = withAuth(async (event) => {
    const data = await event.request.json()
    return { status: 200 }
})
