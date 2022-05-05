import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import passwordValidator from 'password-validator'
import { User } from 'server/db/models'

const schema = new passwordValidator()

schema.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().not().spaces()

// Temp until DB implemented
const users: User[] = [
    {
        id: uuid(),
        email: 'user@mail.se',
        password: bcrypt.hashSync('password', parseInt(import.meta.env.VITE_SALT_ROUNDS)),
        name: 'Name',
        phone: '073-5320103'
    }
]

export async function getUserById(id: string): Promise<User | null> {
    // Replace with DB logic
    const user = users.find((u) => u.id == id)
    return user || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
    // Replace with DB logic
    const user = users.find((u) => u.email == email)
    return user || null
}

export async function checkUsernameExists(email: string): Promise<boolean> {
    // Replace with DB logic
    return users.some((u) => u.email === email)
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

    // Confirm Unique Username
    const usernameNotUnique = await checkUsernameExists(email)

    if (usernameNotUnique) {
        throw {
            message: 'An account already exists for this email',
            issues: { email: 'Email already in use' }
        }
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(import.meta.env.VITE_SALT_ROUNDS))

    const user = new User({ email, name, password: hashedPassword, phone })

    // TODO: await db.users.save(user)
    users.push(user)

    return user
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
    // Replace with DB logic

    const user = await getUserByEmail(email)

    if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (passwordsMatch) {
            return user
        }
    }

    return null
}
