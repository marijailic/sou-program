const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/profile-post/:authorid", authMiddleware, async (req, res) => {
    const authorId = req.params.authorid;

    try {
        const profilePost = await db
            .select()
            .from("profile_post")
            .where("author_id", authorId)
            .orderBy("timestamp", "desc");
        // throw new Error();
        res.json({
            message: "Profile post fetched successfully",
            data: profilePost,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/create-profile-post", authMiddleware, async (req, res) => {
    const text = req.body.text;
    const authorId = req.body.authorId;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const profilePostData = {
        text: text,
        picture_key: "",
        author_id: authorId,
        timestamp: timestamp,
    };

    try {
        await db("profile_post").insert(profilePostData);
        res.json({
            message: "Profile post created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete("/delete-profile-post", authMiddleware, async (req, res) => {
    const idPost = req.body.id;

    try {
        await db("profile_post").where({ id: idPost }).del();
        res.json({ message: "Profile post deleted successfully", data: {} });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/update-profile-post", authMiddleware, async (req, res) => {
    const id = req.body.id;
    const text = req.body.text;

    try {
        await db("profile_post").where({ id: id }).update({ text: text });
        res.json({
            message: "Profile post updated successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
