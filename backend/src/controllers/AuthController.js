import { getAuthUserData } from '../services/authService.js';

export const login = async (req, res) => {
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
};
