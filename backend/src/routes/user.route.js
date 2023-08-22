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

module.exports = router;
