import { Router } from 'express';
import verifyAuth from '../middlewares/verifyAuth.js';
import { deleteLink, links, shortenUrl } from '../controllers/url.controller.js';

const router = Router();

// get all links of a user
router.get("/", verifyAuth, links);

// create a short link
router.post("/", verifyAuth, shortenUrl);

// delete a short link
router.delete("/:id", verifyAuth, deleteLink);

export default router;