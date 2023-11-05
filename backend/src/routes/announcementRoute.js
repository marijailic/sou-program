import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Announcements } from '../models/models';
import { getCurrentDatetime } from '../services/datetimeService';
import { sendAnnouncements } from '../services/sendAnnouncementEmailService';
import { getUserByUsername } from '../services/userService';

export const announcementRoutes = () => {
    const router = Router();
    router.get('/announcements', authMiddleware, async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const LIMIT = 15;

            const offset = (page - 1) * LIMIT;

            const totalAnnouncementsCount = await Announcements()
                .count()
                .first();
            const totalPages = Math.ceil(totalAnnouncementsCount / LIMIT);

            const announcements = await Announcements()
                .orderBy('timestamp', 'desc')
                .offset(offset)
                .limit(LIMIT);

            res.status(200).json({
                message: 'Announcements fetched successfully',
                data: announcements,
                metadata: {
                    totalPages: totalPages,
                    currentPage: page,
                },
            });
        } catch (error) {
            console.error('[GET] Announcement error:', error);
            res.status(500).json({
                error: {
                    code: 'InternalServerError',
                    message: error.message,
                },
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
                    res.status(400).json({
                        error: {
                            code: 'InvalidInput',
                            message: 'Announcement text is required.',
                        },
                    });
                }

                const username = req.headers['username'];
                const user = await getUserByUsername(username);
                if (!user) {
                    return res.status(404).json({
                        error: {
                            code: 'UserNotFound',
                            message: 'User not found.',
                        },
                    });
                }

                const newAnnouncement = {
                    text: text,
                    picture_key: '',
                    author_id: user.id,
                    timestamp: getCurrentDatetime(),
                };

                const [id] = await Announcements()
                    .insert(newAnnouncement)
                    .returning(['id']);
                newAnnouncement.id = id;

                await sendAnnouncements(text);

                res.status(201).json({
                    message: 'Announcement created successfully',
                    data: newAnnouncement,
                });
            } catch (error) {
                console.log('[POST] Announcement error:', error.message);
                res.status(500).json({
                    error: {
                        code: 'InvalidServerError',
                        message: error.message,
                    },
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
                    return res.status(400).json({
                        error: {
                            code: 'InvalidInput',
                            message: 'Announcement text is required.',
                        },
                    });
                }

                const announcement = await Announcements()
                    .where({ id: id })
                    .first();
                if (!announcement) {
                    return res.status(404).json({
                        error: {
                            code: 'AnnouncementNotFound',
                            message: 'Announcement not found.',
                        },
                    });
                }

                await Announcements().where({ id: id }).update({
                    text: text,
                    picture_key: '',
                    author_id: idUser,
                    timestamp: getCurrentDatetime(),
                });

                const updatedAnnouncement = await Announcements()
                    .where({ id: id })
                    .first();

                res.status(200).json({
                    message: 'Announcement updated successfully',
                    data: updatedAnnouncement,
                });
            } catch (error) {
                console.error('[PATCH] Announcement error:', error.message);
                res.status(500).json({
                    error: {
                        code: 'InternalServerError',
                        message: error.message,
                    },
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

                const announcement = await Announcements()
                    .where({ id: id })
                    .first();
                if (!announcement) {
                    return res.status(404).json({
                        error: {
                            code: 'AnnouncementNotFound',
                            message: 'Announcement not found.',
                        },
                    });
                }

                await Announcements().where({ id: id }).del();
                res.status(204).end();
            } catch (error) {
                console.error('[DELETE] Announcement error:', error.message);
                res.status(500).json({
                    error: {
                        code: 'InternalServerError',
                        message: 'Something went wrong on the server.',
                    },
                });
            }
        }
    );

    return router;
};
