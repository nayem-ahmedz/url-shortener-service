import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../middlewares/verifyAuth.js';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
}

// REgister
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false, message: 'All fields are required'
            });
        }

        // Check if user exists
        const [existingUser]: any = await pool.execute(
            'SELECT id FROM users WHERE email = ?', [email]
        );
        if (existingUser.length > 0) {
            return res.status(409).json({
                status: false, message: "Email already registered, try to login"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert user
        await pool.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, passwordHash]
        );

        // Success response
        return res.status(201).json({
            status: true, message: "Registration successful. Please login."
        });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({
            status: false, message: "Server error"
        });
    }
}

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        // Find User
        const [rows]: any = await pool.execute(
            'SELECT id, name, email, password_hash FROM users WHERE email = ?',
            [email]
        );
        const user = rows[0];

        // Verify User & Password
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }

        // Generate jwt Token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        const cookieOptions = {
            secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
            sameSite: 'none' as const,
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        };

        res.cookie('token', token, { ...cookieOptions, httpOnly: true }); // secure cookie
        // js visible cookie, to save server call upon unregistererd visits
        res.cookie('isRegisterred', 'true', { ...cookieOptions, httpOnly: false });

        return res.status(200).json({
            status: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

// Get logged-in user (restore auth)
export const auth = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }

        const [rows]: any = await pool.execute(
            "SELECT id, name, email FROM users WHERE id = ?",
            [userId]
        );

        if (!rows.length) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: true,
            user: rows[0],
        });
    } catch (err) {
        console.error("Auth check error:", err);
        return res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};

// logout
export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true, path: "/" });
    // clearing JS-visible hint cookie as well
    res.clearCookie("isRegisterred", { httpOnly: false, sameSite: "none", secure: true, path: "/" });

    return res.status(200).json({
        status: true,
        message: "Logged out successfully",
    });
};