import cookie from 'cookie'
import { deleteCookie } from 'server/utils/cookie'
import { AUTH_TOKEN, createAuthToken, processRefreshToken, REFRESH_TOKEN } from '../auth/token'

export async function get(request: any) {
    const cookies = cookie.parse(request.headers.cookie)

    const refreshToken = cookies.refresh_jwt

    let processedToken: any
    try {
        processedToken = await processRefreshToken(refreshToken)
    } catch (err) {
        return {
            status: 401,
            headers: {
                'set-cookie': [deleteCookie(AUTH_TOKEN), deleteCookie(REFRESH_TOKEN)]
            },
            body: {
                message: 'Invalid refresh token'
            }
        }
    }

    if (processedToken.isValid) {
        const newAccessToken = createAuthToken(
            processedToken.data.username,
            processedToken.data.userId
        )

        return {
            status: 202,
            headers: {
                'set-cookie': `access_jwt=${newAccessToken}; Path=/; HttpOnly`
            },
            body: {
                message: 'New access token created'
            }
        }
    }

    return {
        status: 403,
        headers: {
            'set-cookie': [deleteCookie(AUTH_TOKEN), deleteCookie(REFRESH_TOKEN)]
        },
        body: {
            message: 'Invalid refresh token'
        }
    }
}
