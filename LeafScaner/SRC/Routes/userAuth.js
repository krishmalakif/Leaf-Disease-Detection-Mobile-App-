import express from 'express';
import { register, login, reset, sendPasswordResetEmail, resetPassword } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset', reset);
router.post('/forgot-password', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);

export default router;
