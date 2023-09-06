const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/gallery", authMiddleware, async (req, res) => {
    try {
        const gallery = await db
            .select()
            .from("gallery")
            .orderBy("timestamp", "desc")
            .limit(10);
        //console.log(gallery);
        res.json({
            message: "Gallery fetched successfully",
            data: gallery,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete("/gallery", authMiddleware, async (req, res) => {
    const idGallery = req.body.id;

    try {
        await db("gallery").where({ id: idGallery }).del();
        res.json({ message: "Gallery deleted successfully", data: {} });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
