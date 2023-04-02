import type { RequestHandler } from '@sveltejs/kit'
import { getAllUsers } from 'server/db/user'
import withAuth from 'server/middleware/withAuth'

// @ts-expect-error Class is JSON serializable
export const GET: RequestHandler = withAuth(async () => {
    const users = await getAllUsers()
    return {
        body: { users }
    }
})
