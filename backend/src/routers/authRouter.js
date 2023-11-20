import { Router } from 'express';
import { login, logout } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = () => {
    return Router()
        .post('/login', login)
        .post('/logout', [authMiddleware], logout);
};
