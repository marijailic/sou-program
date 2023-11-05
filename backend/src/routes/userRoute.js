import { Router } from 'express';
import { getCurrentDatetime } from '../services/datetimeService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Users } from '../models/models';
import { hashPassword } from '../services/authService';

export const userRoutes = () => {
    const router = Router();

    router.get('/users', [authMiddleware], async (req, res) => {
        try {
            const users = await Users().orderBy('id', 'desc');
            res.status(200).json({
                message: 'User fetched successfully',
                data: users,
            });
        } catch (error) {
            console.log('[GET] User error:', error.message);
            res.status(500).json({
                error: {
                    code: 'InternalServerError',
                    message: error.message,
                },
            });
        }
    });

    router.post(
        '/users',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const timestamp = moment()
                    .tz('Europe/Amsterdam')
                    .format('YYYY-MM-DD HH:mm:ss');

                const passwordHash = await hashPassword(req.body.password);

                const newUser = {
                    name: req.body.name,
                    surname: req.body.surname,
                    e_mail: req.body.email,
                    username: req.body.username,
                    password: passwordHash,
                    profile_picture_key: req.body.profile_picture_key,
                    bio: req.body.bio,
                    type: req.body.type,
                    join_date: timestamp,
                };

                const [id] = await Users().insert(newUser).returning(['id']);
                newUser.id = id;

                res.status(201).json({
                    message: 'User created successfully',
                    data: newUser,
                });
            } catch (error) {
                console.log('[POST] User error:', error.message);
                res.status(500).json({
                    error: {
                        code: 'InternalServerError',
                        message: error.message,
                    },
                });
            }
        }
    );

    router.patch(
        '/users/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const id = req.params.id;
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

                const user = await Users().where({ id: id }).first();
                if (!user) {
                    return res.status(404).json({
                        error: {
                            code: 'UserNotFound',
                            message: 'User not found.',
                        },
                    });
                }

                await Users().where({ id: id }).update(userData);

                const updatedUser = await Users().where({ id: id }).first();

                res.status(200).json({
                    message: 'User updated successfully',
                    data: updatedUser,
                });
            } catch (error) {
                console.log('[PATCH] User error:', error.message);
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
        '/users/:id',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
                const id = req.params.id;

                const user = await Users().where({ id: id }).first();
                if (!user) {
                    return res.status(404).json({
                        error: {
                            code: 'UserNotFound',
                            message: 'User not found.',
                        },
                    });
                }

                await Users().where({ id: id }).del();
                res.status(204).end();
            } catch (error) {
                console.error('[DELETE] User error:', error.message);
                res.status(500).json({
                    error: {
                        code: 'InternalServerError',
                        message: error.message,
                    },
                });
            }
        }
    );

    return router;
};
