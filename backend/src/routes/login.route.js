const express = require("express");
const router = express.Router();

const { authUser } = require("../auth");

// router.get("/", (req, res) => {
//   res.json({ app_name: config.app_name });
// });

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // console.log(username);
    // console.log(password);

    // AUTENTIFIKACIJA KORISNIKA
    try {
        let result = await authUser(username, password);
        if (result instanceof Error && result.message == "Unauthorized") {
            res.status(401).json({ error: "Unauthorized" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
});

module.exports = router;
