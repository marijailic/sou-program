import { Router } from 'express';
import { getAuthUserData } from '../services/authService';

export const loginRoutes = () => {
    const router = Router();

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const authData = await getAuthUserData(username, password);
            res.status(200).json({
                message: 'Login successful',
                data: authData,
            });
        } catch (error) {
            console.error('Login error:', error);

            let statusCode = 401;
            let errorMessage = 'Invalid username or password';

            if (error.message === 'No user') {
                statusCode = 404;
                errorMessage = 'User not found';
            } else if (error.message === 'Password fail') {
                statusCode = 401;
                errorMessage = 'Invalid password';
            }

            res.status(statusCode).json({
                error: {
                    code: 'AuthenticationError',
                    message: errorMessage,
                },
            });
        }
    });

    return router;
};
