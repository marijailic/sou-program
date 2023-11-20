import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';

import { authRouter } from './routers/authRouter.js';
import { userRouter } from './routers/userRouter.js';
import { announcementRouter } from './routers/announcementRouter.js';
import { profilePostRouter } from './routers/profilePostRouter.js';
// import { competitionRoutes } from './routes/competitionRoute';
// import { galleryRoutes } from './routes/galleryRoute';
import { googleCredsRoutes } from './routers/googleCredsRouter.js';
import { googleDriveRoutes } from './routers/googleDriveRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/', authRouter());
app.use('/', userRouter());
app.use('/', announcementRouter());
app.use('/', profilePostRouter());
// app.use('/', galleryRoutes());
// app.use('/', competitionRoutes());
app.use('/', googleDriveRoutes());
app.use('/', googleCredsRoutes());

app.listen(process.env.NODE_PORT, () =>
    console.log(`Listening on port ${process.env.NODE_PORT}!`)
);
