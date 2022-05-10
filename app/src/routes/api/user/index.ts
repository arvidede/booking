import type { RequestHandler } from '@sveltejs/kit'
import { queryUser } from 'server/db/user'
import { HTTP } from 'server/utils/constants'

export const get: RequestHandler = (event) => {
    const name = event.url.searchParams.get('name')

    const results = queryUser({ name })
    return {
        status: HTTP.OK,
        body: results
    }
}
