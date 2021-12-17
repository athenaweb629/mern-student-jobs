import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess';

const router = express.Router();

router.get('/', getPosts);
router.post('/createPost', checkIfUserCanAccess, createPost);
router.patch('/updatePost', checkIfUserCanAccess, updatePost);
router.patch('/deletePost', checkIfUserCanAccess, deletePost);

export default router;
