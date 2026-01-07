import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config.ts/db.js';
import jwt from 'jsonwebtoken';

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
                status: false, message: "Email already registered"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(password, passwordHash);

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
            'SELECT * FROM users WHERE email = ?', 
            [email]
        );
        const user = rows[0];

        // Verify User & Password
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ status: false, message: "Invalid email or password" });
        }

        // Generate jwt Token
        const token = jwt.sign( { id: user.id, email: user.email }, process.env.JWT_SECRET || 'chooseandselectyoursecretkey', { expiresIn: '24h' } );

        // Set HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

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