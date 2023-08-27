const moment = require("moment-timezone");
const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/user", authMiddleware, async (req, res) => {
    try {
        const user = await db.select().from("user").orderBy("id", "desc");
        // throw new Error();
        res.json({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.delete("/delete-user", authMiddleware, async (req, res) => {
    const idUser = req.body.id;

    try {
        await db("user").where({ id: idUser }).del();
        res.json({ message: "User deleted successfully", data: {} });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/create-user", authMiddleware, async (req, res) => {
    // const name = req.body.name;

    const timezone = "Europe/Amsterdam";
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        e_mail: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profile_picture_key: "",
        bio: req.body.bio,
        type: req.body.type,
        join_date: timestamp,
    };

    try {
        await db("user").insert(userData);
        res.json({
            message: "User created successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

router.post("/update-user", authMiddleware, async (req, res) => {
    const id = req.body.id;

    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        e_mail: req.body.email,
        // username: req.body.username,
        // password: req.body.password,
        profile_picture_key: "",
        bio: req.body.bio,
        type: req.body.type,
    };

    try {
        await db("user").where({ id: id }).update(userData);
        res.json({
            message: "User updated successfully",
            data: {},
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error", data: {} });
    }
});

module.exports = router;
