import type { RequestHandler } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit/types/private'

export type Middleware = (
    handler: RequestHandler
) => (request: RequestEvent) => ReturnType<RequestHandler>

export interface User {
    id: string
    name: string
    email: string
    phone: string
}
