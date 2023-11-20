import { Announcements } from '../models/models.js';
import { sendAnnouncementToAllUsers } from '../services/sendAnnouncementEmailService.js';

export const index = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 15;

    try {
        const announcementCountObj = await Announcements().count().first();
        const announcementCount = parseInt(announcementCountObj['count']);
        const totalPages = Math.ceil(announcementCount / perPage);

        return res.json({
            message: 'Announcements fetched successfully',
            data: {
                announcements: await Announcements()
                    .orderBy('created_at', 'desc')
                    .offset((currentPage - 1) * perPage)
                    .limit(perPage),
                currentPage,
                totalPages,
            },
        });
    } catch (error) {
        console.error(`[GET] Announcement error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const create = async (req, res) => {
    const text = req.body.text.trim();

    try {
        await Announcements().insert({
            text,
            author_id: req.authUser.id,
        });

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
};

export const update = async (req, res) => {
    try {
        await Announcements().where({ id: req.params.id }).update({
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
};

export const destroy = async (req, res) => {
    try {
        await Announcements().where({ id: req.params.id }).del();
        return res.status(204).end();
    } catch (error) {
        console.error(`[DELETE] Announcement error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};
