import jwt from 'jsonwebtoken'
import type { User } from 'types'
import { v4 as uuid } from 'uuid'
import { AUTH_TOKEN_EXPIRATION, JWT_AUTH_SECRET, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRATION } from './constants'

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

export function createAuthToken(user: User) {
    return jwt.sign(
        {
            type: 'auth',
            userId: user.id,
            email: user.email,
            refreshToken: uuid()
        },
        JWT_AUTH_SECRET,
        { expiresIn: AUTH_TOKEN_EXPIRATION / 1000 }
    )
}

export function createRefreshToken(user: User) {
    const refreshToken = uuid()

    saveRefreshToken({ token: refreshToken, userId: user.id })

    const refreshJwt = jwt.sign(
        {
            type: 'refresh',
            userId: user.id,
            refreshToken,
            email: user.email
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

export async function removeRefreshToken(token: string) {
    try {
        const { refreshToken } = jwt.verify(token, JWT_REFRESH_SECRET) as JWT
        await deleteRefreshToken(refreshToken)
        return true
    } catch {
        return false
    }
}
