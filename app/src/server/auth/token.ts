import jwt from 'jsonwebtoken'
import { getUserById } from 'server/db/user'
import type { User } from 'types'
import { v4 as uuid } from 'uuid'
import { AUTH_TOKEN_EXPIRATION, JWT_AUTH_SECRET, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRATION } from './constants'

export interface JWT {
    type: 'auth' | 'refresh'
    iat: number
    exp: number
    token: string
}

interface AuthToken extends JWT {
    id: string
    email: string
    phone: string
}
interface RefreshToken extends JWT {
    id: string
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
            id: user.id,
            email: user.email,
            phone: user.phone
        },
        JWT_AUTH_SECRET,
        { expiresIn: AUTH_TOKEN_EXPIRATION / 1000 }
    )
}

export function createRefreshToken(user: User) {
    const refreshToken = uuid()

    saveRefreshToken({ token: refreshToken, id: user.id })

    return jwt.sign(
        {
            type: 'refresh',
            id: user.id,
            token: refreshToken
        },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION / 1000 }
    )
}

export async function refreshAuthToken(refreshJwt: string) {
    try {
        const parsedRefreshToken = verifyRefreshToken(refreshJwt)
        if (!parsedRefreshToken) return null

        const user = await getUserById(parsedRefreshToken.id)
        if (!user) return null

        await deleteRefreshToken(parsedRefreshToken.token)

        return {
            authToken: createAuthToken(user),
            refreshToken: createRefreshToken(user),
            user
        }
    } catch {
        return null
    }
}

export function parseJWT<T = AuthToken | RefreshToken>(token: string, secret: string): T | null {
    try {
        return jwt.verify(token, secret) as T
    } catch {
        return null
    }
}

export function parseAuthToken(token: string): AuthToken | null {
    try {
        return jwt.verify(token, JWT_AUTH_SECRET) as AuthToken
    } catch {
        return null
    }
}

export function verifyRefreshToken(token: string) {
    const refreshToken = parseJWT<RefreshToken>(token, JWT_REFRESH_SECRET)
    if (!refreshToken) return false
    const tokenExists = refreshTokens.some((t) => t.token == refreshToken.token && t.id == refreshToken.id)
    return tokenExists ? refreshToken : false
}

export async function removeRefreshToken(token: string) {
    try {
        const { token: refreshToken } = jwt.verify(token, JWT_REFRESH_SECRET) as RefreshToken
        await deleteRefreshToken(refreshToken)
        return true
    } catch {
        return false
    }
}
