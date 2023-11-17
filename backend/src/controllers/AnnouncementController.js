import AnnouncementModel from '../models/AnnouncementModel.js';
import { sendAnnouncementToAllUsers } from '../services/sendAnnouncementEmailService.js';
import { getUserByUsername } from '../services/userService.js';

const AnnouncementController = {
    getPaginatedAnnouncements: async (req, res) => {
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 15;

        try {
            const announcements =
                await AnnouncementModel.getPaginatedAnnouncements(
                    perPage,
                    currentPage
                );

            return res.json({
                message: 'Announcements fetched successfully',
                data: {
                    announcements,
                    currentPage,
                    totalPages: await AnnouncementModel.getTotalPages(perPage),
                },
            });
        } catch (error) {
            console.error(`[GET] Announcement error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },

    createAnnouncement: async (req, res) => {
        const text = req.body.text.trim();
        const username = req.headers['username'];

        try {
            await AnnouncementModel.createAnnouncement({
                text,
                author_id: (await getUserByUsername(username)).id,
            });

            // await sendAnnouncementToAllUsers(text);

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
    },

    updateAnnouncement: async (req, res) => {
        try {
            await AnnouncementModel.updateAnnouncement(req.params.id, {
                text: req.body.text.trim(),
            });

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
    },

    deleteAnnouncement: async (req, res) => {
        try {
            await AnnouncementModel.deleteAnnouncement(req.params.id);
            return res.status(204).end();
        } catch (error) {
            console.error(`[DELETE] Announcement error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },
};

export default AnnouncementController;
