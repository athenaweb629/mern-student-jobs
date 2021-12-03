import express from 'express';
import { createPost } from '../controllers/post.controller';
import checkIfUserCanPost from '../middleware/checkIfUserCanPost';

const router = express.Router();

router.post('/createPost', checkIfUserCanPost, createPost);

export default router;
