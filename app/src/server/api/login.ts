import type { RequestHandler } from '@sveltejs/kit'
import {
    createAuthCookie,
    createRefreshCookie,
    deleteAuthCookie,
    deleteRefreshCookie
} from 'server/utils/cookie'
import { createAuthToken, createRefreshToken } from 'server/auth/token'
import { verifyPassword } from 'server/auth/user'

export const post: RequestHandler = async (event) => {
    const { email, password } = await event.request.json()

    const user = await verifyPassword(email, password)

    if (user) {
        return {
            status: 201,
            headers: {
                'set-cookie': [
                    createAuthCookie(createAuthToken(email, user.id)),
                    createRefreshCookie(createRefreshToken(user.id, user.email))
                ]
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
