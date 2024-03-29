import { Router } from 'express';
import { login, logout, me } from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const authRouter = () => {
    return Router()
        .post('/login', login)
        .use(authMiddleware)
        .post('/logout', logout)
        .post('/auth/me', me); // TODO: Staviti prefix na sve rute /auth/...
};
