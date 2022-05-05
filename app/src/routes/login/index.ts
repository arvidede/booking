import type { RequestHandler } from '@sveltejs/kit'
import { verifyAuthToken } from 'server/auth/token'
import { getAuthCookie } from 'server/utils/cookie'

export const get: RequestHandler = async (event) => {
    const authToken = getAuthCookie(event.request.headers.get('cookie'))

    if (authToken && verifyAuthToken(authToken)) {
        return {
            headers: { Location: '/' },
            status: 302
        }
    }

    return {
        body: {
            bookings: []
        }
    }
}
