import cookie from 'cookie'
import {
    AUTH_TOKEN_COOKIE,
    AUTH_TOKEN_EXPIRATION,
    REFRESH_TOKEN_COOKIE,
    REFRESH_TOKEN_EXPIRATION
} from 'server/auth/constants'
import type { PublicUser } from 'types'
import { timeFromNow } from 'utils/date'
import { createAuthToken, createRefreshToken } from './token'

export const createCookie = (name: string, value: string, expires) => {
    return cookie.serialize(name, value, { httpOnly: true, expires, path: '/' })
}

export const deleteCookie = (name: string) => {
    return cookie.serialize(name, 'deleted', {
        httpOnly: true,
        expires: new Date('01-01-1970'),
        path: '/'
    })
}

export const createAuthCookieFromUser = (user: PublicUser) => {
    const token = createAuthToken(user)
    return createCookie(AUTH_TOKEN_COOKIE, token, timeFromNow(AUTH_TOKEN_EXPIRATION))
}

export const createRefreshCookieFromUser = (user: PublicUser) => {
    const token = createRefreshToken(user)
    return createCookie(REFRESH_TOKEN_COOKIE, token, timeFromNow(REFRESH_TOKEN_EXPIRATION))
}

export const createAuthCookieFromToken = (token: string) => {
    return createCookie(AUTH_TOKEN_COOKIE, token, timeFromNow(AUTH_TOKEN_EXPIRATION))
}

export const createRefreshCookieFromToken = (token: string) => {
    return createCookie(REFRESH_TOKEN_COOKIE, token, timeFromNow(REFRESH_TOKEN_EXPIRATION))
}

export const deleteAuthCookie = () => {
    return deleteCookie(AUTH_TOKEN_COOKIE)
}

export const deleteRefreshCookie = () => {
    return deleteCookie(REFRESH_TOKEN_COOKIE)
}

export const getRefreshCookie = (cookies: string | undefined): string | null => {
    if (!cookies) return null
    return cookie.parse(cookies)[REFRESH_TOKEN_COOKIE] || null
}

export const getAuthCookie = (cookies: string | undefined): string | null => {
    if (!cookies) return null
    return cookie.parse(cookies)[AUTH_TOKEN_COOKIE] || null
}
