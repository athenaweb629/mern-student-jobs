import express from 'express';

import { loginController, registerController, confirmUser, resendEmail, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { validLogin, validSignUp, forgotPasswordValidator, resetPasswordValidator } from '../helpers/valid';

const router = express.Router();

router.post('/login', validLogin, loginController);
router.post('/register', validSignUp, registerController);
router.post('/confirmAccount/:token', confirmUser);

router.get('/resendEmail', resendEmail);
router.patch('/forgotPassword', forgotPasswordValidator, forgotPassword);
router.patch('/resetPassword/:token', resetPasswordValidator, resetPassword);

export default router;
