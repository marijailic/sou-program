require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

// APP ROUTES
//////////////////////////////////////////////////////////////////////////////
const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/userRoute");
const announcementRoute = require("./routes/announcementRoute");
const profilePostRoute = require("./routes/profilePostRoute");
const galleryRoute = require("./routes/galleryRoute");
const competitionRoute = require("./routes/competitionRoute");

// GOOGLE
const googleDriveRoute = require("./routes/googleDriveRoute");
const googleCredsRoute = require("./routes/googleCredsRoute");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/", loginRoute); // login
app.use("/", userRoute); // user (user table)
app.use("/", announcementRoute); // announcement (announcement table)
app.use("/", profilePostRoute); // profile-post (profile_post table && comment table)
app.use("/", galleryRoute); // gallery (gallery table && gallery_item table)
app.use("/", competitionRoute); // competition (competition table && team table && team_member table)

// GOOGLE
app.use("/", googleDriveRoute);
app.use("/", googleCredsRoute);

// APP START
//////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
