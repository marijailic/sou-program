const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware";
import { ProfilePosts } from "../models/models";

const { getUserByUsername } = require("../services/user.service");

router.get("/profile-post/:authorid", authMiddleware, async (req, res) => {
    const authorId = req.params.authorid;

    try {
        const profilePost = await ProfilePosts.where("author_id", authorId)
            .orderBy("timestamp", "desc")
            .limit(10);

        console.log(profilePost);
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
    const idUser = (await getUserByUsername(req.headers["username"])).id;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    if (text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    const profilePostData = {
        text: text,
        picture_key: "",
        author_id: idUser,
        timestamp: timestamp,
    };

    try {
        await ProfilePosts.insert(profilePostData);
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
    const idUser = (await getUserByUsername(req.headers["username"])).id;

    try {
        await ProfilePosts.where({ id: idPost, author_id: idUser }).del();
        res.json({ message: "Profile post deleted successfully", data: {} });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/update-profile-post", authMiddleware, async (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const idUser = (await getUserByUsername(req.headers["username"])).id;

    if (text.trim() === "") {
        res.status(400).json({ message: "Client error", data: {} });
    }

    try {
        await ProfilePosts.where({ id: id, author_id: idUser }).update({
            text: text,
        });
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
