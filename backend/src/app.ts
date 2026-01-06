import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({status: true, message: 'URL Shortener API is running (ES Modules + TS)'});
})

export default app;