import express from 'express';

import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/resendEmail', authController.resendEmail);
router.post('/login', authController.loginController);
router.post('/register', authController.registerController);
router.post('/confirmAccount/:token', authController.confirmUser);

export default router;
