import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

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
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            status: false, message: "Unauthorized Access",
        });
    }

    const token = authToken.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: false, message: "Unauthorized Access",
        });
    }

    try {
        const decoded = verifyToken(token) as {id: number, email: string};
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                status: false,
                message: "Session expired. Please login again.",
            });
        }
        return res.status(401).json({
            status: false,
            message: "Invalid token. Please login again.",
        });
    }
};

export default verifyAuth;