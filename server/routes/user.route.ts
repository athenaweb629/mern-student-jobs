import express from 'express';

import * as authController from '../controllers/auth.controller';
import * as inputValidation from '../helpers/valid';

const router = express.Router();

router.get('/resendEmail', authController.resendEmail);

router.post('/login', inputValidation.validLogin, authController.loginController);
router.post('/register', inputValidation.validSignUp, authController.registerController);
router.post('/confirmAccount/:token', authController.confirmUser);

router.patch('/forgotPassword', inputValidation.forgotPasswordValidator, authController.forgotPassword);
router.patch('/resetPassword/:token', inputValidation.resetPasswordValidator, authController.resetPassword);

export default router;
