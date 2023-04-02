import type { RequestHandler } from '@sveltejs/kit'
import { deleteAuthCookie, deleteRefreshCookie, getRefreshCookie, join } from 'server/auth/cookie'
import { removeRefreshToken } from 'server/auth/token'

export const POST: RequestHandler = async ({ request }) => {
    const refreshToken = getRefreshCookie(request.headers.get('cookie'))
    await removeRefreshToken(refreshToken)

    return new Response(null, {
        status: 302,
        headers: {
            location: '/login',
            'set-cookie': join([deleteAuthCookie(), deleteRefreshCookie()])
        }
    })
}
