import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// routes
import authRoutes from './routes/auth.js';
import urlRoutes from './routes/urls.js';
import { redirectUrl } from './controllers/url.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// parse json from req body
app.use(express.json());
// Parse cookies
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.json({status: true, message: 'URL Shortener API is running (ES Modules + TS)'});
});

// auth endpoint
app.use('/api/auth', authRoutes);

// url shortener related endpoints
app.use("/api/urls", urlRoutes);

// public redirect
app.get("/:shortCode", redirectUrl);

export default app;