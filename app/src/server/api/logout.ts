import type { RequestHandler } from '@sveltejs/kit'
import { deleteAuthCookie, deleteRefreshCookie, getRefreshCookie } from 'server/auth/cookie'
import { removeRefreshToken } from 'server/auth/token'

export const post: RequestHandler = async (event) => {
    const refreshToken = getRefreshCookie(event.request.headers.get('cookie'))
    await removeRefreshToken(refreshToken)

    return {
        status: 200,
        headers: {
            'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
        },
        body: { ok: true }
    }
}
