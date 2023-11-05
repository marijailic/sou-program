import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Announcements } from '../models/models';
import { getCurrentDatetime } from '../services/datetimeService';
import { sendAnnouncements } from '../services/sendAnnouncementEmailService';
import { getUserByUsername } from '../services/userService';

export const announcementRoutes = () => {
    const router = Router();

    router.get('/announcement', authMiddleware, async (req, res) => {
        try {
            const announcement = await Announcements()
                .orderBy('timestamp', 'desc')
                .limit(10);
            return res.json({
                message: 'Announcement fetched successfully',
                data: announcement,
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.delete(
        '/delete-announcement',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idAnnouncement = req.body.id;

            try {
                await Announcements()
                    .where({
                        id: idAnnouncement,
                    })
                    .del();
                return res.json({
                    message: 'Announcement deleted successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.post(
        '/create-announcement',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const text = req.body.text;
            const idUser = (await getUserByUsername(req.headers['username']))
                .id;

            if (text.trim() === '') {
                return res
                    .status(400)
                    .json({ message: 'Client error', data: {} });
            }

            const announcementData = {
                text: text,
                picture_key: '',
                author_id: idUser,
                timestamp: getCurrentDatetime(),
            };

            try {
                await Announcements().insert(announcementData);
                await sendAnnouncements(text);

                return res.json({
                    message: 'Announcement created successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.post(
        '/update-announcement',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const id = req.body.id;
            const text = req.body.text;

            if (text.trim() === '') {
                return res
                    .status(400)
                    .json({ message: 'Client error', data: {} });
            }

            try {
                await Announcements().where({ id: id }).update({
                    text: text,
                });

                return res.json({
                    message: 'Announcement updated successfully',
                    data: {},
                });
            } catch (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    return router;
};
