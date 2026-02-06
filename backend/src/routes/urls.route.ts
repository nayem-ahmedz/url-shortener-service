import { Router } from 'express';
import verifyAuth from '../middlewares/verifyAuth.js';
import { deleteLink, getMyLinks, shortenUrl } from '../controllers/url.js';

const router = Router();

// Protected routes for dashboard
//-------------------------------
// create a short link
router.post("/shorten", verifyAuth, shortenUrl);

// get all links of a user
router.get("/my-links", verifyAuth, getMyLinks);

// delete a short link
router.delete("/delete/:id", verifyAuth, deleteLink);

export default router;