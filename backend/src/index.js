const express = require("express");
const fs = require("fs");

const app = express();

const config = JSON.parse(fs.readFileSync("config.json"));
const port = config.port;

app.get("/", (req, res) => res.send("Lorem ipsum"));

app.listen(port, () => console.log(`Listening on port ${port}`));
