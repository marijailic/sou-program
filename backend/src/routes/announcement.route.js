const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/announcement", authMiddleware, async (req, res) => {
  try {
    var announcement = await db.select().from("announcement");
    console.log(announcement);
    // throw new Error();
    res.json({
      message: "Announcement fetched successfully",
      data: announcement,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error", data: {} });
  }
});

router.delete("/delete-announcement", authMiddleware, async (req, res) => {
  const idAnnouncement = req.body.id;

  try {
    await db("announcement").where({ id: idAnnouncement }).del();
    res.json({ message: "Announcement deleted successfully", data: {} });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error", data: {} });
  }
});

module.exports = router;
