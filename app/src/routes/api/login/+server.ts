import type { RequestHandler } from '@sveltejs/kit'
import {
    createAuthCookieFromUser,
    createRefreshCookieFromUser,
    deleteAuthCookie,
    deleteRefreshCookie,
    join
} from 'server/auth/cookie'
import { verifyPassword } from 'server/db/user'
import { HTTP } from 'server/utils/constants'

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json()

    const user = await verifyPassword(email, password)

    if (user) {
        return new Response(null, {
            status: HTTP.FOUND,
            headers: {
                location: '/user',
                'set-cookie': join([createAuthCookieFromUser(user), createRefreshCookieFromUser(user)])
            }
        })
    }

    return new Response(null, {
        status: HTTP.UNAUTHORIZED,
        headers: {
            'set-cookie': join([deleteAuthCookie(), deleteRefreshCookie()])
        }
    })
}
