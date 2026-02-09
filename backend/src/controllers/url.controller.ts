import type { Response } from "express";
import { nanoid } from "nanoid";
import type { AuthRequest } from "../middlewares/verifyAuth.js";
// import pool from '../config/db.js'; // local mysql db
import pool from "../config/remote-db.js";
import { getMyLinks } from "../services/url.service.js";


// create a short url
export const shortenUrl = async (req: AuthRequest, res: Response) => {
    try {
        const { longUrl } = req.body;
        const userId = req.user?.id;

        if (!longUrl) {
            return res.status(400).json({ status: false, message: "URL is required" });
        }

        // Check usage limit (max 100 URLs per user) for free
        const [countResult]: any = await pool.execute(
            "SELECT COUNT(*) as count FROM urls WHERE user_id = ?", [userId]
        );
        if (countResult[0].count >= 10) {
            return res.status(403).json({
                status: false, message: "Limit reached! Free tier is limited to 100 URLs. Please upgrade."
            });
        }

        // Generate unique short code using nanoid package
        let shortCode = nanoid(7);
        let exists = true;

        // Collision check
        while (exists) {
            const [rows]: any = await pool.execute(
                "SELECT id FROM urls WHERE short_code = ?", [shortCode]
            );
            if (rows.length === 0) {
                exists = false;
            } else {
                shortCode = nanoid(7); // regenerate short code
            }
        }

        await pool.execute(
            "INSERT INTO urls (user_id, long_url, short_code) VALUES (?, ?, ?)", [userId, longUrl, shortCode]
        );
        // Return short URL
        return res.status(201).json({
            status: true, shortCode
        });
    } catch (err) {
        console.error("shortenUrl error:", err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


// Get all user links
export const links = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        const links = await getMyLinks(userId!);
        return res.status(200).json({
            status: true,
            links: links
        });
    } catch (err) {
        console.error("getMyLinks error:", err);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

// Delete a link
export const deleteLink = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        await pool.execute(
            "DELETE FROM urls WHERE id = ? AND user_id = ?", [id, userId]
        );

        return res.status(200).json({ status: true, message: "Link deleted successfully" });
    } catch (err) {
        console.error("deleteLink error:", err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


// Redirect short URL
export const redirectUrl = async (req: any, res: Response) => {
    try {
        const { shortCode } = req.params;
        const [rows]: any = await pool.execute(
            "SELECT long_url FROM urls WHERE short_code = ?", [shortCode]
        );

        if (rows.length === 0) return res.status(404).send("URL not found");

        // click count++
        await pool.execute(
            "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?", [shortCode]
        );

        return res.redirect(rows[0].long_url);
    } catch (err) {
        console.error("redirectUrl error:", err);
        return res.status(500).send("Server error");
    }
};