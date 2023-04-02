import type { RequestHandler } from '@sveltejs/kit'
import withAuth from 'server/middleware/withAuth'

export const GET: RequestHandler = withAuth(async () => {
    return new Response(String({ data: [] }))
})

export const POST: RequestHandler = withAuth(async (event) => {
    const data = await event.request.json()
    return new Response()
})
