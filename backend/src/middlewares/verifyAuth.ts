import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
}

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            status: false, message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    } catch (err: any) {
        return res.status(401).json({
            status: false, message: "Session expired or invalid. Please login again.",
        });
    }
};

export default verifyAuth;