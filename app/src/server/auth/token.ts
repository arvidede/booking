import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import {
    AUTH_TOKEN_EXPIRATION,
    JWT_AUTH_SECRET,
    JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRATION
} from './constants'

export interface JWT {
    type: string
    email: string
    userId: string
    refreshToken: string
    iat: number
    exp: number
}

interface RefreshToken {
    userId: string
    token: string
}

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
            type: 'auth',
            userId,
            username,
            refreshToken: uuid()
        },
        JWT_AUTH_SECRET,
        { expiresIn: AUTH_TOKEN_EXPIRATION / 1000 }
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
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION / 1000 }
    )

    return refreshJwt
}

export async function processRefreshToken(
    refreshJwt: string
): Promise<{ isValid: boolean; token: string; user: { userId: string; email: string } }> {
    const { userId, refreshToken, email } = jwt.verify(refreshJwt, JWT_REFRESH_SECRET) as JWT

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

export function parseAuthToken(token) {
    try {
        return jwt.verify(token, JWT_AUTH_SECRET) as JWT
    } catch {
        return null
    }
}

function verifyToken(token: string, secret: string): boolean {
    try {
        return Boolean(jwt.verify(token, secret))
    } catch {
        return false
    }
}

export function verifyAuthToken(token: string) {
    return verifyToken(token, JWT_AUTH_SECRET)
}

export function verifyRefreshToken(token: string) {
    return verifyToken(token, JWT_REFRESH_SECRET)
}

export async function removeRefreshToken(refreshJwt: string) {
    const { refreshToken } = jwt.verify(refreshJwt, JWT_REFRESH_SECRET) as JWT

    return deleteRefreshToken(refreshToken)
}
