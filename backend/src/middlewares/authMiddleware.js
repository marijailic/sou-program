import { validateToken } from '../services/authService';

export const authMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'].split(' ');
    const authorizationType = authorization[0];
    const token = authorization[1];
    const refreshToken = req.headers['refreshtoken'];
    const username = req.headers['username'];
    const userType = req.headers['type'];

    if (authorizationType !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate token
    let isTokenValid = validateToken({
        username,
        userType,
        token,
        secret: process.env.ACCESS_TOKEN_SECRET,
    });

    if (isTokenValid) {
        next();
        return;
    }

    // Validate refresh token
    let isRefreshTokenValid = validateToken({
        username,
        userType,
        token: refreshToken,
        secret: process.env.REFRESH_TOKEN_SECRET,
    });

    if (isRefreshTokenValid) {
        next();
        return;
    }

    return res.status(401).json({ error: 'Unauthorized' });
};
