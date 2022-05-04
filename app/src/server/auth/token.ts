import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

export interface RefreshtJwt {
    type: string
    email: string
    userId: string
    refreshToken: string
}

interface RefreshToken {
    userId: string
    token: string
}

const JWT_AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET.toString()
const JWT_REFRESH_SECRET = import.meta.env.VITE_REFRESH_SECRET.toString()
export const AUTH_TOKEN = 'auth_token'
export const REFRESH_TOKEN = 'refresh_token'

let refreshTokens: RefreshToken[] = []

const saveRefreshToken = (token) => {
    // TODO: Replace with DB Solution
    refreshTokens.push(token)
}

const deleteRefreshToken = (token) => {
    // TODO: Replace with DB Solution
    const tokenIndex = refreshTokens.findIndex((t) => t.token === token)
    if (tokenIndex) refreshTokens = refreshTokens.splice(tokenIndex, 1)
    return true
}

export function createAuthToken(username: string, userId: string) {
    return jwt.sign(
        {
            type: 'access',
            userId,
            username,
            refreshToken: uuid()
        },
        JWT_AUTH_SECRET,
        { expiresIn: '5m' }
    )
}

export function createRefreshToken(userId: string, email: string) {
    const refreshToken = uuid()

    saveRefreshToken({ token: refreshToken, userId })

    const refreshJwt = jwt.sign(
        {
            type: 'refresh',
            userId,
            refreshToken,
            email
        },
        JWT_AUTH_SECRET,
        { expiresIn: '15d' }
    )

    return refreshJwt
}

export async function processRefreshToken(
    refreshJwt: string
): Promise<{ isValid: boolean; token: string; user: { userId: string; email: string } }> {
    const { userId, refreshToken, email } = jwt.verify(
        refreshJwt,
        JWT_REFRESH_SECRET
    ) as RefreshtJwt

    // Replace with DB Logic

    const tokenExists = refreshTokens.some((t) => t.token == refreshToken && t.userId == userId)

    return {
        isValid: tokenExists,
        token: refreshToken,
        user: {
            userId,
            email
        }
    }
}

export async function removeRefreshToken(refreshJwt: string) {
    const { refreshToken } = jwt.verify(refreshJwt, JWT_REFRESH_SECRET) as RefreshtJwt

    return deleteRefreshToken(refreshToken)
}
