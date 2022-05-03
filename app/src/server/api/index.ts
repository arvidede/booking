import type { RequestHandler } from '@sveltejs/kit'
import withAuth from 'server/middleware/withAuth'

export const get: RequestHandler = withAuth((request) => {
    console.log(request)

    return {
        body: 'Hello world',
        status: 200
    }
})
