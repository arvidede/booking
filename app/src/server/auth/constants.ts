export const JWT_AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET.toString()
export const JWT_REFRESH_SECRET = import.meta.env.VITE_REFRESH_SECRET.toString()
export const AUTH_TOKEN_COOKIE = 'auth_token'
export const REFRESH_TOKEN_COOKIE = 'refresh_token'
export const AUTH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 1
export const REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 30
export const COOKIE_DELIMITER = ','
