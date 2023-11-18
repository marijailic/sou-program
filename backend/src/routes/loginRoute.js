import { Router } from 'express';
import { AuthService } from '../services/authService';

export const loginRoutes = () => {
    const router = Router();

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        const authService = new AuthService(username, password);

        if (authService.failed) {
            console.error(`[POST] Login error: ${error.message}`);
            res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }

        authService.addAuthCookieToRes();

        return res.json({
            message: 'Login successful',
            data: authService.frontendData,
        });
    });

    return router;
};
