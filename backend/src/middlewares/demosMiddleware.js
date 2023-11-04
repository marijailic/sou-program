function demosMiddleware(req, res, next) {
    if (req.headers["type"] === "demonstrator") {
        next();
        return;
    }

    return res.status(401).json({ error: "Unauthorized" });
}

export { demosMiddleware };
