import express from 'express';
import { createPost, getPosts } from '../controllers/post.controller';
import checkIfUserCanPost from '../middleware/checkIfUserCanPost';

const router = express.Router();

router.get('/', getPosts);
router.post('/', checkIfUserCanPost, createPost);

export default router;
