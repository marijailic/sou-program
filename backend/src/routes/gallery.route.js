const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/gallery", authMiddleware, async (req, res) => {
    try {
        var gallery = await db
            .select()
            .from("gallery")
            .orderBy("id", "desc")
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

router.get("/gallery/:id", authMiddleware, async (req, res) => {
    const idGallery = req.params.id;

    try {
        const gallery = await db
            .select()
            .from("gallery")
            .where({ id: idGallery })

        const galleryItems = await db
            .select()
            .from("gallery_item")
            .where({ gallery_id: idGallery })

        res.json({
            message: "Gallery with id fetched successfully",
            data: gallery,
            dataItems: galleryItems
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete("/gallery/:id", authMiddleware, async (req, res) => {
    const idGallery = req.params.id;

    try {
        await db("gallery").where({ id: idGallery }).del();
        res.status(204).end();
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/gallery", authMiddleware, async (req, res) => {
    const { title, text, author_id } = req.body;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const galleryData = {
        text: text,
        title: title,
        author_id: author_id,
        timestamp: timestamp,
    };

    try {
        const [id] = await db("gallery").insert(galleryData, "id");

        res.json({
            message: "Gallery created successfully",
            data: id,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.patch("/gallery/:id", authMiddleware, async (req, res) => {
    const idGallery = req.params.id;
    const { title, text } = req.body;

    try {
        await db("gallery")
            .where({ id: idGallery })
            .update({ title: title, text: text });
        res.json({
            message: "Gallery updated successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.get("/gallery/item", authMiddleware, async (req, res) => {
    try {
        var galleryItem = await db.select().from("gallery-item");
        console.log(galleryItem);
        res.json({
            message: "Gallery item fetched successfully",
            data: galleryItem,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/gallery/:id/items", authMiddleware, async (req, res) => {
    const galleryId = req.params.id;
    const { picture_keys } = req.body;

    const timezone = "Europe/Amsterdam";

    try {
        for (let i = 0; i < picture_keys.length; i++) {
            const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
            const galleryItemData = {
                gallery_id: galleryId,
                picture_key: picture_keys[i],
                timestamp: timestamp,
            };

            await db("gallery-item").insert(galleryItemData);
        }
        res.status(201).json({
            message: "Gallery items created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});


module.exports = router;
