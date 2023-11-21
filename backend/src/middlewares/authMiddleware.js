import { verifyToken } from '../services/authService.js';
import { getCookieTokenFromReq } from '../services/cookieService.js';

export const authMiddleware = (req, res, next) => {
    const accessToken = getCookieTokenFromReq(req);
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenPayload = verifyToken(accessToken);
    if (!tokenPayload) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, username, type } = tokenPayload;
    req.authUser = { id, username, type };

    if (!id || !username || !type) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    return next();
};
