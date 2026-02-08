import pool from "../config/remote-db.js";
import { signToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const registerUser = async (name: string, email: string, password: string) => {
    // Check if user exists
    const [existingUser]: any = await pool.execute(
        'SELECT id FROM users WHERE email = ?', [email]
    );
    if (existingUser.length > 0) {
        throw { status: 409, message: "Email already registered, try to login" };
    }
    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert user
    await pool.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
    );
    return {
        message: 'Registration successful'
    }
}

export const loginUser = async (email: string, password: string) => {
    // Find User
    const [rows]: any = await pool.execute(
        'SELECT id, name, email, password_hash FROM users WHERE email = ?',
        [email]
    );
    const user = rows[0];

    // Verify User & Password
    if (!user || !(await comparePassword(password, user.password_hash))) {
        throw { status: 401, message: "Invalid email or password" };
    }

    // Generate jwt Token
    const token = signToken({ id: user.id, email: user.email });

    return {
        token,
        user: { id: user.id, name: user.name, email: user.email }
    }
}


export const restoreAuth = async (userId: number) => {
    const [rows]: any = await pool.execute(
        "SELECT id, name, email FROM users WHERE id = ?",
        [userId]
    );

    if (!rows.length) {
        throw { status: 404, message: "User not found" };
    }

    return rows[0];
}