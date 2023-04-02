import type { RequestHandler } from '@sveltejs/kit'
import { deleteUser } from 'server/db/user'
import withAuth from 'server/middleware/withAuth'

export const DELETE: RequestHandler = withAuth(async (event) => {
    const userId = event.params.id
    const ok = await deleteUser(userId)
    if (ok) {
        return new Response(undefined, { status: 200 })
    }
    return new Response(undefined, { status: 500 })
})
