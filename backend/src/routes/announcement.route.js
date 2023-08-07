const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../auth");

router.get("/announcement", authMiddleware, async (req, res) => {
  res.json({ test: "test" });
});

module.exports = router;
