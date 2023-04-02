import { parseAuthToken } from 'server/auth/token'
import { getAuthCookie } from 'server/auth/cookie'
import { sanitizeUser } from 'server/db/user'

export async function handle({ event, resolve }) {
    const token = getAuthCookie(event.request.headers.get('cookie'))
    if (token) {
        event.locals.user = sanitizeUser(parseAuthToken(token))
    }
    return await resolve(event)
}
