import type { RequestHandler } from '@sveltejs/kit'
import withAuth from 'server/middleware/withAuth'

export const GET: RequestHandler = withAuth((request) => {
    console.log(request)
    return new Response('Index', { status: 200 })
})
