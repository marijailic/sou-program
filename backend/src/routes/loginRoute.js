import { Router } from 'express';
import { getAuthUserData } from '../services/authService';

export const loginRoutes = () => {
    const router = Router();

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const authUserData = await getAuthUserData(username, password);
            return res.json({
                message: 'Login successful',
                data: authUserData,
            });
        } catch (error) {
            console.error(`[POST] Login error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    return router;
};
