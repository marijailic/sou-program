import { Router } from 'express';
import { login } from '../controllers/AuthController.js';

export const authRouter = () => {
    return Router().post('/login', login);
};
