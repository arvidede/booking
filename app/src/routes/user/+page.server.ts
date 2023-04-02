import { protect } from 'utils/auth'

export async function load({ parent }) {
    const data = await parent()
    return protect(data)
}
