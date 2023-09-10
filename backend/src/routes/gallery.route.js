const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/gallery-item/:gallery_id", authMiddleware, async (req, res) => {
    const galleryID = req.params.gallery_id;

    try {
        const galleryItem = await db
            .select()
            .from("gallery_item")
            .where({ gallery_id: galleryID })
            .orderBy("timestamp", "asc");

        res.json({
            message: "Gallery item fetched successfully",
            data: galleryItem,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

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
        const gallery = await db("gallery").returning("id").insert(galleryData);
        const galleryID = gallery[0];

        res.json({
            message: "Gallery created successfully",
            data: { galleryID },
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/gallery-item/:gallery_id", authMiddleware, async (req, res) => {
    const galleryID = req.params.gallery_id;
    const imageIDs = req.body.galleryItemIDs;

    const timezone = "Europe/Amsterdam";

    try {
        for (let i = 0; i < imageIDs.length; i++) {
            const timestamp = moment()
                .tz(timezone)
                .format("YYYY-MM-DD HH:mm:ss");

            const galleryItemData = {
                picture_key: imageIDs[i],
                gallery_id: galleryID,
                timestamp: timestamp,
            };

            await db("gallery_item").insert(galleryItemData);
        }

        res.json({
            message: "Gallery items created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.patch("/update-gallery", authMiddleware, async (req, res) => {
    const id = req.body.id;

    const title = req.body.title;
    const text = req.body.text;

    if (title.trim() === "" || text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    const galleryData = {
        title: title,
        text: text,
    };

    try {
        await db("gallery").where({ id: id }).update(galleryData);
        res.json({
            message: "Gallery updated successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
