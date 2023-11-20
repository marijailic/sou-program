import { getCookieTokenFromReq } from '../services/cookieService.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const accessToken = getCookieTokenFromReq(req);
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let tokenPayload;
    try {
        tokenPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, username, type } = tokenPayload;
    req.authUser = { id, username, type };

    if (!id || !username || !type) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    return next();
};
