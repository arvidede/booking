export function getSession({ locals }) {
    return {
        user: locals.user
    }
}
