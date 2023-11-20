import express from 'express';

express()
    .post('/login', (req, res) => {
        console.log('Hello world');

        return res.json({
            message: 'Login successful',
            data: {},
        });
    })
    .listen(3000, () => console.log('Running'));

// import { config } from 'dotenv';
// config();

// // import cors from 'cors';
// import express from 'express';
// import { announcementRouter } from './routers/announcementRouter.js';
// import { authRouter } from './routers/authRouter.js';
// import { profilePostRouter } from './routers/profilePostRouter.js';
// import { userRouter } from './routers/userRouter.js';
// // import { competitionRoutes } from './routes/competitionRoute';
// // import { galleryRoutes } from './routes/galleryRoute';
// import cookieParser from 'cookie-parser';
// import moment from 'moment-timezone';
// import { googleCredsRoutes } from './routers/googleCredsRouter.js';
// import { googleDriveRoutes } from './routers/googleDriveRouter.js';

// // moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
// const app = express();

// // CONFIG
// // app.use(cookieParser());
// // app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
// app.use(express.json());
// // app.use(express.json({ limit: '5mb' }));
// app.use(express.urlencoded({ limit: '5mb', extended: true }));

// app.use('/', authRouter());
// // app.use('/', userRouter());
// // app.use('/', announcementRouter());
// // app.use('/', profilePostRouter());
// // // app.use('/', galleryRoutes());
// // // app.use('/', competitionRoutes());
// // app.use('/', googleDriveRoutes());
// // app.use('/', googleCredsRoutes());

// app.listen(process.env.NODE_PORT, () =>
//     console.log(`Listening on port ${process.env.NODE_PORT}!`)
// );
