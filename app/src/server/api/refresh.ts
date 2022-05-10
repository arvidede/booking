import {
    createAuthCookieFromToken,
    createRefreshCookieFromToken,
    deleteAuthCookie,
    deleteRefreshCookie,
    getRefreshCookie
} from 'server/auth/cookie'
import { HTTP } from 'server/utils/constants'
import { refreshAuthToken } from '../auth/token'

export async function get(request: any) {
    try {
        const refreshToken = getRefreshCookie(request.headers.cookie)
        const token = await refreshAuthToken(refreshToken)

        if (token) {
            return {
                status: 202,
                headers: {
                    'set-cookie': [
                        createAuthCookieFromToken(token.authToken),
                        createRefreshCookieFromToken(token.refreshToken)
                    ]
                },
                body: {
                    message: 'New auth token created'
                }
            }
        }

        return {
            status: HTTP.FORBIDDEN,
            headers: {
                'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
            },
            body: {
                message: 'Invalid refresh token'
            }
        }
    } catch (err) {
        return {
            status: HTTP.FORBIDDEN,
            headers: {
                'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
            },
            body: {
                message: 'Invalid refresh token'
            }
        }
    }
}
