import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/verifyAuth.js';
// import pool from '../config/db.js'; // local mysql db
import pool from '../config/remote-db.js';
import { loginUser, registerUser, restoreAuth } from '../services/auth.service.js';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
}

// REgister
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false, message: 'All fields are required'
            });
        }

        const result = await registerUser(name, email, password);
        console.log(result);
        // Success response
        return res.status(201).json({
            status: true, ...result
        });

    } catch (err: any) {
        console.error("Register error:", err);
        return res.status(err.status || 500).json({
            status: false, message: err.message || "Server error"
        });
    }
}

const isProduction = process.env.NODE_ENV === 'production';

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const { token, user } = await loginUser(email, password);

        return res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            user
        });

    } catch (err: any) {
        console.error("Login Error:", err);
        return res.status(err.status || 500).json({
            status: false, message: err.message || "Internal server error"
        });
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
        const user = await restoreAuth(userId);

        return res.status(200).json({
            status: true,
            user
        });
    } catch (err: any) {
        console.error("Auth check error:", err);
        return res.status(err.status || 500).json({
            status: false,
            message: err.message || "Server error",
        });
    }
};

// logout
export const logout = (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Logged out successfully",
        });
    } catch (err: any) {
        console.error("logout error:", err);
        return res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};