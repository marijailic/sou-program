import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';

import { authRoutes } from './routes/authRoute.js';
import { userRoutes } from './routes/userRoute.js';
import { announcementRoutes } from './routes/announcementRoute.js';
import { profilePostRoutes } from './routes/profilePostRoute.js';
// import { competitionRoutes } from './routes/competitionRoute';
// import { galleryRoutes } from './routes/galleryRoute';
import { googleCredsRoutes } from './routes/googleCredsRoute.js';
import { googleDriveRoutes } from './routes/googleDriveRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/', authRoutes()); // login
app.use('/', userRoutes()); // user (user table)
app.use('/', announcementRoutes()); // announcement (announcement table)
app.use('/', profilePostRoutes()); // profile-post (profile_post table && comment table)
// app.use('/', galleryRoutes()); // gallery (gallery table && gallery_item table)
// app.use('/', competitionRoutes()); // competition (competition table && team table && team_member table)

// GOOGLE
app.use('/', googleDriveRoutes());
app.use('/', googleCredsRoutes());

app.listen(process.env.NODE_PORT, () =>
    console.log(`Listening on port ${process.env.NODE_PORT}!`)
);
