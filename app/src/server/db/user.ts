import bcrypt from 'bcrypt'
import passwordValidator from 'password-validator'
import { User } from 'server/db/models'
import type { AuthToken, PublicUser as PublicUser } from 'types'
import db from 'server/db'

const schema = new passwordValidator()

schema.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().not().spaces()

export const sanitizeUser = (user: User | AuthToken): PublicUser => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone
    }
}

export async function deleteUser(id: string): Promise<boolean> {
    return Boolean((await db.users.delete({ id })).affected)
}

export async function getAllUsers(): Promise<PublicUser[] | null> {
    return db.users.find({ select: { id: true, name: true, phone: true, email: true } })
}

export async function queryUser(where: Partial<User>): Promise<PublicUser[]> {
    return db.users.find({
        select: {
            name: true,
            email: true,
            id: true,
            phone: true
        },
        where
    })
}

export async function getUserById(id: string): Promise<User | null> {
    return db.users.findOneBy({ id })
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return db.users.findOneBy({ email })
}

export async function checkUserEmailExists(email: string): Promise<boolean> {
    return Boolean(await getUserByEmail(email))
}

export async function createNewUser(email: string, name: string, password: string, phone: string): Promise<User> {
    const passwordValidation = schema.validate(password, { details: true }) as any[]

    if (passwordValidation.length) {
        const issues = passwordValidation.map((i) => i.message)

        throw {
            message: 'Password does not meet requirements',
            issues: { password: issues }
        }
    }

    const emailNotUnique = await checkUserEmailExists(email)

    if (emailNotUnique) {
        throw {
            message: 'An account already exists for this email',
            issues: { email: 'Email already in use' }
        }
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(import.meta.env.VITE_SALT_ROUNDS))

    const user = new User({ email, name, password: hashedPassword, phone })

    await db.users.insert(user)

    return user
}

export async function verifyPassword(email: string, password: string) {
    const user = await getUserByEmail(email)

    if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (passwordsMatch) {
            return user
        }
    }

    return false
}
