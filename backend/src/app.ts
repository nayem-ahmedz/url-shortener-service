import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

// routes
import authRoutes from './routes/auth.route.js';
import urlRoutes from './routes/urls.route.js';
import { redirectUrl } from './controllers/url.controller.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json()); // parse json from req body

app.get('/', (req: Request, res: Response) => {
    res.json({status: true, message: 'URL Shortener API is running (ES Modules + TS)'});
});

// APIs
app.use('/api/auth', authRoutes); // auth endpoint
app.use("/api/url", urlRoutes); // url shortener related endpoints

// public redirect
app.get("/:shortCode", redirectUrl);

export default app;