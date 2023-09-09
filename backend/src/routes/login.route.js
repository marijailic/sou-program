const express = require("express");
const router = express.Router();

const { getAuthUserData } = require("../auth");

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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
