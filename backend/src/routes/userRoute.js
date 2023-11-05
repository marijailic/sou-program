import { Router } from 'express';
import { getCurrentDatetime } from '../services/datetimeService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Users } from '../models/models';
import { hashPassword } from '../services/authService';

export const userRoutes = () => {
    const router = Router();

    router.get('/user', [authMiddleware], async (req, res) => {
        try {
            const users = await Users().orderBy('id', 'desc');
            return res.json({
                message: 'User fetched successfully',
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.delete(
        '/delete-user',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                await Users().where({ id: req.body.id }).del();
                return res.json({
                    message: 'User deleted successfully',
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
        '/create-user',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const passwordHash = await hashPassword(req.body.password);

            const userData = {
                name: req.body.name,
                surname: req.body.surname,
                e_mail: req.body.email,
                username: req.body.username,
                password: passwordHash,
                profile_picture_key: req.body.profile_picture_key,
                bio: req.body.bio,
                type: req.body.type,
                join_date: getCurrentDatetime(),
            };

            try {
                await Users().insert(userData);
                return res.json({
                    message: 'User created successfully',
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
        '/update-user',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const id = req.body.id;

            const userData = {
                name: req.body.name,
                surname: req.body.surname,
                e_mail: req.body.email,
                // username: req.body.username,
                // password: req.body.password,
                // profile_picture_key: "",
                bio: req.body.bio,
                type: req.body.type,
            };

            try {
                await Users().where({ id: id }).update(userData);
                return res.json({
                    message: 'User updated successfully',
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
