import type { RequestHandler } from '@sveltejs/kit'
import { createAuthCookieFromUser, createRefreshCookieFromUser } from 'server/auth/cookie'
import { createNewUser, sanitizeUser } from 'server/db/user'
import { HTTP } from 'server/utils/constants'

interface UserBody {
    email: string
    name: string
    phone: string
    password: string
}

// @ts-expect-error User is JSON serializable
export const post: RequestHandler = async ({ request }) => {
    const { email, name, password, phone }: UserBody = await request.json()

    try {
        const user = await createNewUser(email, name, password, phone)

        return {
            status: HTTP.CREATED,
            headers: {
                'set-cookie': [createAuthCookieFromUser(user), createRefreshCookieFromUser(user)]
            },
            body: {
                message: `Successfully created user: ${user.name}`,
                user: sanitizeUser(user)
            }
        }
    } catch (err) {
        return {
            status: HTTP.BAD_REQUEST,
            body: {
                errors: err.issues
            }
        }
    }
}
