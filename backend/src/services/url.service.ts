import pool from "../config/remote-db.js";

export async function getMyLinks(userId: number) {
    const [rows]: any = await pool.execute(
        "SELECT id, long_url, short_code, clicks, created_at FROM urls WHERE user_id = ? ORDER BY created_at DESC", [userId]
    );
    return rows;
}