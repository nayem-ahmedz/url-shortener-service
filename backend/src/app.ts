import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
// routes
import authRoutes from './routes/auth.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({status: true, message: 'URL Shortener API is running (ES Modules + TS)'});
})

app.use('/api/auth', authRoutes);

export default app;