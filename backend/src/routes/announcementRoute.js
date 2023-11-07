import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Announcements } from '../models/models';
import { getCurrentDatetime } from '../services/datetimeService';
import { sendAnnouncementToAllUsers } from '../services/sendAnnouncementEmailService';
import { getUserByUsername } from '../services/userService';

export const announcementRoutes = () => {
    const router = Router();

    router.get('/announcements', [authMiddleware], async (req, res) => {
        try {
            const currentPage = parseInt(req.query.page) || 1;
            const LIMIT = 15;

            const offset = (currentPage - 1) * LIMIT;

            const totalAnnouncementsCount = await Announcements()
                .count()
                .first();
            const totalPages = Math.ceil(totalAnnouncementsCount / LIMIT);

            const announcements = await Announcements()
                .orderBy('timestamp', 'desc')
                .offset(offset)
                .limit(LIMIT);

            return res.json({
                message: 'Announcements fetched successfully',
                data: {
                    announcements,
                    totalPages,
                    currentPage,
                },
            });
        } catch (error) {
            console.error(`[GET] Announcement error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.post(
        '/announcements',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const text = req.body.text;

                if (!text && text.trim() === '') {
                    console.error(
                        '[POST] Announcement error: Announcement text is required'
                    );
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                const username = req.headers['username'];
                const user = await getUserByUsername(username);
                if (!user) {
                    console.error('[POST] Announcement error: User not found');
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                const newAnnouncement = {
                    text,
                    picture_key: '',
                    author_id: user.id,
                    timestamp: getCurrentDatetime(),
                };

                await Announcements().insert(newAnnouncement);

                await sendAnnouncementToAllUsers(text);

                return res.status(201).json({
                    message: 'Announcement created successfully',
                    data: {},
                });
            } catch (error) {
                console.error(`[POST] Announcement error: ${error.message}`);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.patch(
        '/announcements/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const id = req.params.id;
                const text = req.body.text;

                if (!text || text.trim() === '') {
                    console.error(
                        '[PATCH] Announcement error: Announcement text is required'
                    );
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                const announcementQuery = Announcements().where({ id });
                const announcement = await announcementQuery.first();
                if (!announcement) {
                    console.error(
                        '[PATCH] Announcement error: Announcement not found'
                    );
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                await announcementQuery.update({ text });

                return res.json({
                    message: 'Announcement updated successfully',
                    data: {},
                });
            } catch (error) {
                console.error(`[PATCH] Announcement error: ${error.message}`);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    router.delete(
        '/announcements/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const id = req.params.id;

                const announcementQuery = Announcements().where({ id });
                const announcement = await announcementQuery.first();

                if (!announcement) {
                    console.error(
                        '[DELETE] Announcement error: Announcement not found'
                    );
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                await announcementQuery.del();
                return res.status(204).end();
            } catch (error) {
                console.error(`[DELETE] Announcement error: ${error.message}`);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    return router;
};
