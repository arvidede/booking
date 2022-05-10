import { del, get } from './api'

export const deleteUser = async (id: string) => {
    return del(`/api/user/${id}`)
}

export const search = (query: string) => {
    return get<string[]>(`/api/user?name=${query}`)
}
