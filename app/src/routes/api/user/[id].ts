import type { RequestHandler } from '@sveltejs/kit'
import { deleteUser } from 'server/db/user'
import withAuth from 'server/middleware/withAuth'

export const del: RequestHandler = withAuth(async (event) => {
    const userId = event.params.id
    const ok = await deleteUser(userId)
    if (ok) {
        return { status: 200, body: true }
    }
    return { status: 500, body: false }
})
