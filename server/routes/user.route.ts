import express from 'express';
import { loginController, registerController, confirmUser, resendEmail, forgotPassword, resetPassword, doSomething } from '../controllers/auth.controller';
import { validLogin, validSignUp, forgotPasswordValidator, resetPasswordValidator } from '../helpers/valid';
import checkTokenExpiry from '../middleware/checkTokenExpiry';

const router = express.Router();

router.post('/login', validLogin, loginController);
router.post('/register', validSignUp, registerController);
router.get('/confirm-account/:token', confirmUser);
router.get('/authorizedAction', checkTokenExpiry, doSomething);
// router.get('/authorized-action', checkTokenExpiry, doSomething);

router.get('/resend-email', resendEmail);
// router.get('/resendEmail', resendEmail);

export default router;
