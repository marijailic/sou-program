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

router.post("/gallery", authMiddleware, async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const author_id = req.body.author_id;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    if (title.trim() === "" || text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    const galleryData = {
        title: title,
        text: text,
        author_id: author_id,
        timestamp: timestamp,
    };

    try {
        await db("gallery").insert(galleryData);
        res.json({
            message: "Gallery created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
