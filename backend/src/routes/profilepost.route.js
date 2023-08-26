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

module.exports = router;
