require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

// APP ROUTES
//////////////////////////////////////////////////////////////////////////////
const loginRoute = require("./routes/login.route");
const userRoute = require("./routes/user.route");
const announcementRoute = require("./routes/announcement.route");
const profilePostRoute = require("./routes/profilepost.route");
const galleryRoute = require("./routes/gallery.route");
const googleDriveRoute = require("./routes/googleauth.route");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/", loginRoute); // login
app.use("/", userRoute); // user (user table)
app.use("/", announcementRoute); // announcement (announcement table)
app.use("/", profilePostRoute); // profile-post (profile_post table && comment table)
app.use("/", galleryRoute); // gallery (gallery table && gallery_item table)
app.use("/", googleDriveRoute);

// APP START
//////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
