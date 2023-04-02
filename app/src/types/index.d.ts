import type { RequestHandler } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit/types/private'

export type Middleware = (handler: RequestHandler) => (request: RequestEvent) => ReturnType<RequestHandler>

export interface PublicUser {
    id: string
    name: string
    email: string
    phone: string
}

interface JWT {
    type: 'auth' | 'refresh'
    iat: number
    exp: number
    token: string
}

export interface AuthToken extends JWT {
    type: 'auth'
    id: string
    name: string
    email: string
    phone: string
}
export interface RefreshToken extends JWT {
    type: 'refresh'
    id: string
}
