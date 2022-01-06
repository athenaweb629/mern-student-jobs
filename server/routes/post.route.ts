import express from 'express';

import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess';

const router = express.Router();

router.get('/', getPosts);
router.post('/', checkIfUserCanAccess, createPost);
router.patch('/', checkIfUserCanAccess, updatePost);
router.patch('/delete', checkIfUserCanAccess, deletePost);

export default router;
