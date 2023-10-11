const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

import { Users } from "../models/models";

import { demosMiddleware } from "../middlewares/demos.middleware";
import { hashPassword, authMiddleware } from "../middlewares/auth.middleware";
import db from "../db";

router.get("/user", [authMiddleware], async (req, res, next) => {
    try {
        const users = await db.select().from("user").orderBy("id", "desc");
        res.json({
            message: "User fetched successfully",
            data: users,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete(
    "/delete-user",
    [authMiddleware, demosMiddleware],
    async (req, res, next) => {
        try {
            await Users.where({ id: req.body.id }).del();
            res.json({
                message: "User deleted successfully",
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
    "/create-user",
    [authMiddleware, demosMiddleware],
    async (req, res, next) => {
        const timezone = "Europe/Amsterdam";
        const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

        const passwordHash = await hashPassword(req.body.password);

        const userData = {
            name: req.body.name,
            surname: req.body.surname,
            e_mail: req.body.email,
            username: req.body.username,
            password: passwordHash,
            profile_picture_key: req.body.profile_picture_key,
            bio: req.body.bio,
            type: req.body.type,
            join_date: timestamp,
        };

        try {
            await Users.insert(userData).then(() =>
                res.json({
                    message: "User created successfully",
                    data: {},
                })
            );
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
    "/update-user",
    [authMiddleware, demosMiddleware],
    async (req, res) => {
        const id = req.body.id;

        const userData = {
            name: req.body.name,
            surname: req.body.surname,
            e_mail: req.body.email,
            // username: req.body.username,
            // password: req.body.password,
            // profile_picture_key: "",
            bio: req.body.bio,
            type: req.body.type,
        };

        try {
            await Users.where({ id: id }).update(userData);
            res.json({
                message: "User updated successfully",
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
