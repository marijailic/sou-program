const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  try {
    let users = await db.select().from("user");
    console.log(users);
  } catch (error) {
    console.log("XXXXXXXXXXX", error);
  }

  res.send("Welcome to the homepage!");
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    let users = await db.where("id", id).select().from("user");
    console.log(users);
  } catch (error) {
    console.log(error);
  }

  res.send("Welcome to the homepage!");
});

module.exports = router;
