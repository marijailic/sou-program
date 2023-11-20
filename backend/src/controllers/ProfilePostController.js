import { ProfilePosts } from '../models/models.js';
import { getUserByUsername } from '../services/userService.js';

export const index = async (req, res) => {
    const authorID = req.query.author_id;
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 15;

    try {
        const profilePostCountObj = await ProfilePosts()
            .where({ author_id: authorID })
            .count()
            .first();
        const profilePostCount = parseInt(profilePostCountObj['count']);
        const totalPages = Math.ceil(profilePostCount / perPage);

        return res.json({
            message: 'Profile posts fetched successfully',
            data: {
                profilePosts: await ProfilePosts()
                    .where({ author_id: authorID })
                    .orderBy('created_at', 'desc')
                    .offset((currentPage - 1) * perPage)
                    .limit(perPage),
                currentPage,
                totalPages,
            },
        });
    } catch (error) {
        console.error(`[GET] Profile post error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const create = async (req, res) => {
    const username = req.headers['username'];

    try {
        await ProfilePosts().insert({
            text: req.body.text.trim(),
            author_id: (await getUserByUsername(username)).id,
        });

        return res.status(201).json({
            message: 'Profile post created successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[POST] Profile post error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const update = async (req, res) => {
    const username = req.headers['username'];

    try {
        await ProfilePosts()
            .where({
                id: req.params.id,
                author_id: (await getUserByUsername(username)).id,
            })
            .update({
                text: req.body.text.trim(),
            });

        return res.json({
            message: 'Profile post updated successfully',
            data: {},
        });
    } catch (error) {
        console.error(`[PATCH] Profile post error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};

export const destroy = async (req, res) => {
    const username = req.headers['username'];

    try {
        await ProfilePosts()
            .where({
                id: req.params.id,
                author_id: (await getUserByUsername(username)).id,
            })
            .del();
        return res.status(204).end();
    } catch (error) {
        console.error(`[DELETE] Profile post error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }
};
