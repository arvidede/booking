import { parseAuthToken } from 'server/auth/token'
import { getAuthCookie } from 'server/auth/cookie'

export async function handle({ event, resolve }) {
    const token = getAuthCookie(event.request.headers.get('cookie'))
    if (token) {
        event.locals.user = parseAuthToken(token)
    }
    return await resolve(event)
}
