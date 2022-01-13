import express from 'express';

import { createPost, getPosts, updatePost, deletePost, getPostById, getPostsByAuthor } from '../controllers/post.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess';

const router = express.Router();

router.get('/', getPosts);
router.get('/author', checkIfUserCanAccess, getPostsByAuthor);
router.get('/:postID', checkIfUserCanAccess, getPostById);
router.post('/', checkIfUserCanAccess, createPost);
router.patch('/', checkIfUserCanAccess, updatePost);
router.patch('/delete', checkIfUserCanAccess, deletePost);

export default router;
