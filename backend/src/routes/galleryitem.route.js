const express = require("express");
const router = express.Router();

const db = require("../db");

const { authMiddleware } = require("../auth");

router.get("/gallery-item", authMiddleware, async (req, res) => {
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

module.exports = router;
