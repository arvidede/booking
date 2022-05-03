import { v4 as uuid } from 'uuid'

interface Booking {
    id: string
    data: string
}

export const createBooking = (data: string): Booking => {
    const id = uuid()
    return { id, data }
}
