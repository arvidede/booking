export const protect = (session: App.Session) => {
    if (!session.user) {
        return {
            status: 302,
            redirect: '/login'
        }
    }
    return false
}
