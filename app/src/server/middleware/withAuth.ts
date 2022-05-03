import type { Middleware } from 'types'

const withAuth: Middleware = (handler) => (request) => {
    // if (!authenticated)
    // return {
    //     status: 401,
    // }

    return handler(request)
}
export default withAuth
