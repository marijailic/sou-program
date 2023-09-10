const express = require("express");
const router = express.Router();
const fs = require("fs");

import { googleAuth } from "../services/googleAuth.service";

router.get("/google/auth", async (req, res) => {
    const oauth2Client = googleAuth();
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive",
        ],
    });
    res.redirect(url);
});

router.get("/google/redirect", async (req, res) => {
    const oauth2Client = googleAuth();
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync("creds.json", JSON.stringify(tokens));
    res.send("Success");
});

module.exports = router;
