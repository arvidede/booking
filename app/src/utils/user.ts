import { del } from './api'

export const deleteUser = async (id: string) => {
    return del(`/api/user/${id}`)
}
