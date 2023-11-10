import { Router } from 'express';
import { getCurrentDatetime } from '../services/datetimeService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ProfilePosts } from '../models/models';
import { getUserByUsername } from '../services/userService';
import {
    createProfilePostValidation,
    updateProfilePostValidation,
} from '../middlewares/validation/profilePostValidation';

export const profilePostRoutes = () => {
    const router = Router();

    router.get('/profile-posts', [authMiddleware], async (req, res) => {
        try {
            const authorID = req.query.author_id;
            const page = parseInt(req.query.page) || 1;

            const LIMIT = 15;
            const offset = (page - 1) * LIMIT;

            const totalProfilePostsCount = await ProfilePosts()
                .where({ author_id: authorID })
                .count()
                .first();
            const totalPages = Math.ceil(totalProfilePostsCount.count / LIMIT);
            const profilePosts = await ProfilePosts()
                .where({ author_id: authorID })
                .orderBy('timestamp', 'desc')
                .offset(offset)
                .limit(LIMIT);

            return res.json({
                message: 'Profile posts fetched successfully',
                data: {
                    profilePosts,
                    totalPages,
                    currentPage: page,
                },
            });
        } catch (error) {
            console.error(`[GET] Profile post error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.post(
        '/profile-posts',
        [authMiddleware, createProfilePostValidation],
        async (req, res) => {
            try {
                const username = req.headers['username'];
                await ProfilePosts().insert({
                    text: req.body.text.trim(),
                    picture_key: '',
                    author_id: (await getUserByUsername(username)).id,
                    timestamp: getCurrentDatetime(),
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
        }
    );

    router.patch(
        '/profile-posts/:id',
        [authMiddleware, updateProfilePostValidation],
        async (req, res) => {
            try {
                const username = req.headers['username'];
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
        }
    );

    router.delete('/profile-posts/:id', [authMiddleware], async (req, res) => {
        try {
            const username = req.headers['username'];
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
    });

    return router;
};
