import type { RequestHandler } from '@sveltejs/kit'
import { queryUser } from 'server/db/user'

export const GET: RequestHandler = async (event) => {
    const name = event.url.searchParams.get('name')

    const results = await queryUser({ name })
    return new Response(String(results))
}
