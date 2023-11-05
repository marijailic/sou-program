export const demosMiddleware = (req, res, next) => {
    if (req.headers['type'] === 'demonstrator') {
        return next();
    }

    return res.status(401).json({ error: 'Unauthorized' });
};
