import {
    createAuthCookie,
    deleteAuthCookie,
    deleteRefreshCookie,
    getRefreshCookie
} from 'server/auth/cookie'
import { processRefreshToken } from '../auth/token'

export async function get(request: any) {
    const refreshToken = getRefreshCookie(request.headers.cookie)

    let processedToken: any
    try {
        processedToken = await processRefreshToken(refreshToken)
    } catch (err) {
        return {
            status: 401,
            headers: {
                'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
            },
            body: {
                message: 'Invalid refresh token'
            }
        }
    }

    if (processedToken.isValid) {
        const { username: email, userId: id } = processedToken.data

        return {
            status: 202,
            headers: {
                'set-cookie': createAuthCookie({ id, email })
            },
            body: {
                message: 'New auth token created'
            }
        }
    }

    return {
        status: 403,
        headers: {
            'set-cookie': [deleteAuthCookie(), deleteRefreshCookie()]
        },
        body: {
            message: 'Invalid refresh token'
        }
    }
}
