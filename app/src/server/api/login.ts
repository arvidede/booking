import type { RequestHandler } from '@sveltejs/kit'
import { createCookie } from 'server/utils/cookie'
import { AUTH_TOKEN, createAuthToken, createRefreshToken, REFRESH_TOKEN } from '../auth/token'
import { checkPassword } from '../auth/user'

export const post: RequestHandler = async (event) => {
    const { email, password } = await event.request.json()

    const user = await checkPassword(email, password)

    if (user) {
        return {
            status: 201,
            headers: {
                'set-cookie': [
                    createCookie(AUTH_TOKEN, createAuthToken(email, user.id)),
                    createCookie(REFRESH_TOKEN, createRefreshToken(user.id, user.email))
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
            'set-cookie': [
                'access_jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
                'refresh_jwt=deleted; path=/auth/refresh; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            ]
        },
        body: {
            message: 'Login failed'
        }
    }
}
