import express from 'express';

import * as authController from '../controllers/auth.controller'

const router = express.Router();

router.post('/login', authController.loginController);
router.post('/register', authController.registerController);

export default router;