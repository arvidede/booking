import { redirect } from '@sveltejs/kit'

export const protect = (page: App.PageData) => {
    if (!page || !page.user) {
        throw redirect(302, '/login')
    }
    return page
}

export async function load({ session }) {
    return protect(session)
}
