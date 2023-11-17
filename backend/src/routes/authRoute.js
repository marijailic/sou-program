import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

export const authRoutes = () => {
    const router = Router();

    router.post('/login', AuthController.loginUser);

    return router;
};
