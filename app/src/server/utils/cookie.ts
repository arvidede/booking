import cookie from 'cookie'

export const createCookie = (name, value, expires = new Date('2023-01-01')) => {
    return cookie.serialize(name, value, { httpOnly: true, expires })
}

export const deleteCookie = (name) => {
    return cookie.serialize(name, '', { httpOnly: true, expires: new Date('01-01-1970') })
}
