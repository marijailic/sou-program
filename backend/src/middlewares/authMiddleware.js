import { validateToken } from '../services/authService.js';
import { getCookieDataFromRequest } from '../services/cookieService.js';

export const authMiddleware = (req, res, next) => {
    return next();
    const authCookie = getCookieDataFromRequest(req);
    if (!authCookie) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { username, userType, token } = authCookie;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const isTokenValid = validateToken({ username, userType, token, secret });
    if (!isTokenValid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: Implement global state managment za current user
    req.someData = { username, type };

    return next();
};
