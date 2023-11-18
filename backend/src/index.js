require('dotenv').config();

import cors from 'cors';
import express from 'express';
import { announcementRoutes } from './routes/announcementRoute';
// import { competitionRoutes } from './routes/competitionRoute';
// import { galleryRoutes } from './routes/galleryRoute';
import { googleCredsRoutes } from './routes/googleCredsRoute';
import { googleDriveRoutes } from './routes/googleDriveRoute';
import { loginRoutes } from './routes/loginRoute';
import { profilePostRoutes } from './routes/profilePostRoute';
import { userRoutes } from './routes/userRoute';
import moment from 'moment-timezone';
import cookieParser from 'cookie-parser';

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
const app = express();

// CONFIG
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// ROUTES
app.use('/', loginRoutes()); // login
app.use('/', userRoutes()); // user (user table)
app.use('/', announcementRoutes()); // announcement (announcement table)
app.use('/', profilePostRoutes()); // profile-post (profile_post table && comment table)
// app.use('/', galleryRoutes()); // gallery (gallery table && gallery_item table)
// app.use('/', competitionRoutes()); // competition (competition table && team table && team_member table)

// GOOGLE
app.use('/', googleDriveRoutes());
app.use('/', googleCredsRoutes());

// APP START
app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
