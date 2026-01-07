import { Router } from 'express';
import { auth, login, logout, register } from '../controllers/auth.js';
import verifyAuth from '../middlewares/verifyAuth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyAuth, auth);
router.post('/logout', verifyAuth, logout);

export default router;