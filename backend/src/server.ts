import 'dotenv/config';
import app from "./app.js";
import pool from "./config.ts/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // Test DB connection
        await pool.query('SELECT 1');
        console.log('Database connected');

        // Start server only if DB is connected
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error('Failed to connect to database');
        console.error(error);
        process.exit(1);
    }
}

startServer();