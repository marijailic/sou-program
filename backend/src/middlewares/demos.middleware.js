function demosMiddleware(req, res, next) {
    if (req.headers["type"] === "demonstrator") {
        next();
    }

    return res.status(401).json({ error: "Unauthorized" });
}

export { demosMiddleware };
