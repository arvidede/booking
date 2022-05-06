import type { GetSession } from '@sveltejs/kit'

export const getSession: GetSession = ({ locals }) => {
    return {
        user: locals.user || null
    }
}
