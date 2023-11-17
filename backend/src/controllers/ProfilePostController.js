import ProfilePostModel from '../models/ProfilePostModel.js';
import { getUserByUsername } from '../services/userService.js';

const ProfilePostController = {
    getPaginatedProfilePosts: async (req, res) => {
        const authorID = req.query.author_id;
        const currentPage = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.per_page) || 15;

        try {
            const profilePosts =
                await ProfilePostModel.getPaginatedProfilePosts(
                    authorID,
                    perPage,
                    currentPage
                );

            return res.json({
                message: 'Profile posts fetched successfully',
                data: {
                    profilePosts,
                    currentPage,
                    totalPages: await ProfilePostModel.getTotalPages(
                        authorID,
                        perPage
                    ),
                },
            });
        } catch (error) {
            console.error(`[GET] Profile post error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },

    createProfilePost: async (req, res) => {
        const username = req.headers['username'];

        try {
            await ProfilePostModel.createProfilePost({
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
    },

    updateProfilePost: async (req, res) => {
        const username = req.headers['username'];

        try {
            const authorID = (await getUserByUsername(username)).id;

            await ProfilePostModel.updateProfilePost(req.params.id, authorID, {
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
    },

    deleteProfilePost: async (req, res) => {
        const username = req.headers['username'];

        try {
            const authorID = (await getUserByUsername(username)).id;

            await ProfilePostModel.deleteProfilePost(req.params.id, authorID);
            return res.status(204).end();
        } catch (error) {
            console.error(`[DELETE] Profile post error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    },
};

export default ProfilePostController;
