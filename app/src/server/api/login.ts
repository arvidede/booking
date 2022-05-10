import type { RequestHandler } from '@sveltejs/kit'
import {
    createAuthCookieFromUser,
    createRefreshCookieFromUser,
    deleteAuthCookie,
    deleteRefreshCookie
} from 'server/auth/cookie'
import { verifyPassword } from 'server/db/user'

export const post: RequestHandler = async (event) => {
    const { email, password } = await event.request.json()

    const user = await verifyPassword(email, password)

    if (user) {
        return {
            status: 201,
            headers: {
                'set-cookie': [createAuthCookieFromUser(user), createRefreshCookieFromUser(user)]
            },
            body: {
                message: `Successfully logged in`,
                user: {
                    email,
                    id: user.id
                }
            }
        }
    }

    return {
        status: 401,
        headers: {
            'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
        },
        body: {
            message: 'Login failed'
        }
    }
}
