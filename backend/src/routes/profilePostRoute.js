const moment = require('moment-timezone');
const express = require('express');
const router = express.Router();

import { authMiddleware } from '../middlewares/authMiddleware';
import { ProfilePosts } from '../models/models';

const { getUserByUsername } = require('../services/userService');

router.get('/profile-posts', authMiddleware, async (req, res) => {
    try {
        const authorID = req.query.author_id;
        const page = parseInt(req.query.page) || 1;

        const LIMIT = 15;
        const offset = (page - 1) * LIMIT;

        const totalProfilePostsCount = await ProfilePosts()
            .where({ author_id: authorID })
            .count()
            .first();
        const totalPages = Math.ceil(totalProfilePostsCount / LIMIT);

        const profilePosts = await ProfilePosts()
            .where({ author_id: authorID })
            .orderBy('timestamp', 'desc')
            .offset(offset)
            .limit(LIMIT);

        res.status(200).json({
            message: 'Profile posts fetched successfully',
            data: profilePosts,
            metadata: {
                totalPages: totalPages,
                currentPage: page,
            },
        });
    } catch (error) {
        console.error('[GET] Profile post error:', error.message);
        res.status(500).json({
            error: {
                code: 'InternalServerError',
                message: error.message,
            },
        });
    }
});

router.post('/profile-posts', authMiddleware, async (req, res) => {
    try {
        const text = req.body.text;
        const authorID = (await getUserByUsername(req.headers['username'])).id;

        const timestamp = moment()
            .tz('Europe/Amsterdam')
            .format('YYYY-MM-DD HH:mm:ss');

        if (!text && text.trim() === '') {
            return res.status(400).json({
                error: {
                    code: 'InvalidInput',
                    message: 'Profile post text is required',
                },
            });
        }

        const newProfilePost = {
            text: text,
            picture_key: '',
            author_id: authorID,
            timestamp: timestamp,
        };

        const [id] = await ProfilePosts()
            .insert(newProfilePost)
            .returning(['id']);
        newProfilePost.id = id;

        res.json({
            message: 'Profile post created successfully',
            data: newProfilePost,
        });
    } catch (error) {
        console.log('[POST] Profile post error:', error.message);
        res.status(500).json({
            error: {
                code: 'InternalServerError',
                message: error.message,
            },
        });
    }
});

router.patch('/profile-posts/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const text = req.body.text;
        const authorID = (await getUserByUsername(req.headers['username'])).id;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                error: {
                    code: 'InvalidInput',
                    message: 'Profile post text is required.',
                },
            });
        }

        const profilePost = await ProfilePosts()
            .where({ id: id, author_id: authorID })
            .first();
        if (!profilePost) {
            return res.status(404).json({
                error: {
                    code: 'ProfilePostNotFound',
                    message: 'Profile post not found for the current user.',
                },
            });
        }

        await ProfilePosts().where({ id: id, author_id: authorID }).update({
            text: text,
        });

        const updatedProfilePost = await ProfilePosts()
            .where({ id: id, author_id: authorID })
            .first();

        res.json({
            message: 'Profile post updated successfully',
            data: updatedProfilePost,
        });
    } catch (error) {
        console.log('[PATCH] Profile post error:', error.message);
        res.status(500).json({
            error: {
                code: 'InternalServerError',
                message: error.message,
            },
        });
    }
});

router.delete('/profile-posts/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const authorID = (await getUserByUsername(req.headers['username'])).id;

        const profilePost = await ProfilePosts()
            .where({ id: id, author_id: authorID })
            .first();
        if (!profilePost) {
            return res.status(404).json({
                error: {
                    code: 'ProfilePostNotFound',
                    message: 'Profile post not found for the user.',
                },
            });
        }

        await ProfilePosts().where({ id: id, author_id: authorID }).del();

        res.status(204).end();
    } catch (error) {
        console.log('[DELETE] Profile post error:', error.message);
        res.status(500).json({
            error: {
                code: 'InternalServerError',
                message: error.message,
            },
        });
    }
});

module.exports = router;
