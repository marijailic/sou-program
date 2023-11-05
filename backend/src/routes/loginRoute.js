import { Router } from 'express';
import { getAuthUserData } from '../services/authService';

export const loginRoutes = () => {
    const router = Router();

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const { token, refreshToken, type } = await getAuthUserData(
                username,
                password
            );
            return res
                .status(200)
                .json({ token, refreshToken, username, type });
        } catch (error) {
            return res.status(401).json({
                error: error.message,
            });
        }
    });

    return router;
};
