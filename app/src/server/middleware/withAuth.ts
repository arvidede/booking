import type { Middleware } from 'types'

const withAuth: Middleware = (handler) => (event) => {
    console.log({ user: event.locals.user })
    // if (!authenticated)
    // return {
    //     status: 401,
    // }

    return handler(event)
}
export default withAuth
