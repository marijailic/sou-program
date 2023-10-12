const express = require("express");
const router = express.Router();

import { getAuthUserData } from "../middlewares/auth.middleware";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const { token, refreshToken, type } = await getAuthUserData(
            username,
            password
        );
        res.status(200).json({ token, refreshToken, username, type });
    } catch (error) {
        res.status(401).json({
            error: error.message,
        });
    }
});

module.exports = router;
