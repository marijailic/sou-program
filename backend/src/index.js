require("dotenv").config();
const bodyParser = require("body-parser")
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
const galleryRoute = require("./routes/gallery.route");
const profilePostRoute = require("./routes/profilepost.route");
const googleDriveRoute = require("./routes/google_auth");

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

app.use("/", loginRoute); // home
app.use("/", userRoute); // user (user table)
app.use("/", announcementRoute); // announcement (announcement table)
app.use("/", galleryRoute); // gallery (gallery table)
app.use("/", profilePostRoute); // profile-post (profile post table && comment table)
app.use("/", googleDriveRoute);

// APP START
//////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
