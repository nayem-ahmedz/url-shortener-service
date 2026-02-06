import pool from '../src/config/remote-db';
import app from '../src/app';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        // 1. Connect to DB (Usually includes logic to skip if already connected)
        await pool.query('SELECT 1');

        // 2. Pass the request/response to your Express app
        return app(req, res);
    } catch (err: any) {
        console.error('Database connection failed:', err.message);
        res.status(500).json({
            status: false,
            message: "Database connection error",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};