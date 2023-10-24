const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

import db from "../db";
import { authMiddleware } from "../middlewares/authMiddleware";
import { demosMiddleware } from "../middlewares/demosMiddleware";

const { getUserByUsername } = require("../services/userService");
const {
    sendAnnouncements,
} = require("../services/sendAnnouncementEmailService");

router.get("/announcement", authMiddleware, async (req, res) => {
    try {
        const announcement = await db("announcement")
            .orderBy("timestamp", "desc")
            .limit(10);
        res.json({
            message: "Announcement fetched successfully",
            data: announcement,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Internal server error",
            data: {},
        });
    }
});

router.delete(
    "/delete-announcement",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const idAnnouncement = req.body.id;
        const idUser = (await getUserByUsername(req.headers["username"])).id;

        try {
            await db("announcement")
                .where({
                    id: idAnnouncement,
                    author_id: idUser,
                })
                .del();
            res.json({
                message: "Announcement deleted successfully",
                data: {},
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.post(
    "/create-announcement",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        console.log("Create");
        const text = req.body.text;
        const idUser = (await getUserByUsername(req.headers["username"])).id;

        const timezone = "Europe/Amsterdam";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        if (text.trim() === "") {
            res.status(400).json({ message: "Client error", data: {} });
        }

        const announcementData = {
            text: text,
            picture_key: "",
            author_id: idUser,
            timestamp: timestamp,
        };

        try {
            await db("announcement").insert(announcementData);
            await sendAnnouncements(text);

            res.json({
                message: "Announcement created successfully",
                data: {},
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

router.post(
    "/update-announcement",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const id = req.body.id;
        const text = req.body.text;
        const idUser = (await getUserByUsername(req.headers["username"])).id;

        if (text.trim() === "") {
            res.status(400).json({ message: "Client error", data: {} });
            return;
        }

        try {
            await db("announcement")
                .where({ id: id, author_id: idUser })
                .update({
                    text: text,
                });

            res.json({
                message: "Announcement updated successfully",
                data: {},
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                message: "Internal server error",
                data: {},
            });
        }
    }
);

module.exports = router;
