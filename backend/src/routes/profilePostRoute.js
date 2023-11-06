import { Router } from 'express';
import { getCurrentDatetime } from '../services/datetimeService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ProfilePosts } from '../models/models';
import { getUserByUsername } from '../services/userService';

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
            const totalPages = Math.ceil(totalProfilePostsCount / LIMIT);

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

    router.post('/profile-posts', [authMiddleware], async (req, res) => {
        try {
            const text = req.body.text;
            const username = req.headers['username'];
            const authorID = (await getUserByUsername(username)).id;

            if (!text && text.trim() === '') {
                console.error(
                    '[POST] Profile post error: Profile post text is required'
                );
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }

            const newProfilePost = {
                text,
                picture_key: '',
                author_id: authorID,
                timestamp: getCurrentDatetime(),
            };

            await ProfilePosts().insert(newProfilePost);

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
    });

    router.patch('/profile-posts/:id', [authMiddleware], async (req, res) => {
        try {
            const id = req.params.id;
            const text = req.body.text;
            const username = req.headers['username'];
            const authorID = (await getUserByUsername(username)).id;

            if (!text || text.trim() === '') {
                console.error(
                    '[PATCH] Profile post error: Profile post text is required'
                );
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }

            const profilePost = await ProfilePosts()
                .where({ id, author_id: authorID })
                .first();
            if (!profilePost) {
                console.error(
                    '[PATCH] Profile post error: Profile post not found'
                );
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }

            await ProfilePosts()
                .where({ id, author_id: authorID })
                .update({ text });

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
    });

    router.delete('/profile-posts/:id', [authMiddleware], async (req, res) => {
        try {
            const id = req.params.id;
            const username = req.headers['username'];
            const authorID = (await getUserByUsername(username)).id;

            const profilePost = await ProfilePosts()
                .where({ id, author_id: authorID })
                .first();
            if (!profilePost) {
                console.error(
                    '[DELETE] Profile post error: Profile post not found'
                );
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }

            await ProfilePosts().where({ id, author_id: authorID }).del();

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
