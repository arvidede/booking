import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import passwordValidator from 'password-validator'

interface User {
    id: string
    email: string
    hashedPassword: string
}
const schema = new passwordValidator()

schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces()

// Temp until DB implemented
const users: {
    id: string
    email: string
    hashedPassword: string
}[] = [
    {
        id: uuid(),
        email: 'user@mail.se',
        hashedPassword: bcrypt.hashSync('password', parseInt(import.meta.env.VITE_SALT_ROUNDS))
    }
]

export async function getUser(id: string): Promise<User | null> {
    // Replace with DB logic
    const user = users.find((u) => u.id == id)

    if (!user) return null

    return { id: user.id, email: user.email, hashedPassword: user.hashedPassword }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    // Replace with DB logic
    const user = users.find((u) => u.email == email)

    if (!user) return null

    return { ...user, hashedPassword: user.hashedPassword }
}

export async function checkUsernameExists(email: string): Promise<boolean> {
    // Replace with DB logic
    return users.some((u) => u.email === email)
}

export async function createNewUser(
    email: string,
    password: string
): Promise<{ email: string; id: string }> {
    const passwordValidation = schema.validate(password, { details: true }) as any[]

    if (passwordValidation.length) {
        const issues = passwordValidation.map((i) => i.message)

        throw {
            message: 'Password does not meet requirements',
            issues: issues
        }
    }

    // Confirm Unique Username
    const usernameNotUnique = await checkUsernameExists(email)

    if (usernameNotUnique) {
        throw {
            message: 'An account already exists for this email',
            issues: ['Email already in use']
        }
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(import.meta.env.VITE_SALT_ROUNDS))

    const userId = uuid()

    // Replace with DB logic
    users.push({
        email,
        hashedPassword,
        id: userId
    })

    return { email, id: userId }
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
    // Replace with DB logic

    const user = getUserByEmail(email)

    if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)

        if (passwordsMatch) {
            return { email, id: user.id, hashedPassword: user.hashedPassword }
        }
    }

    return null
}
