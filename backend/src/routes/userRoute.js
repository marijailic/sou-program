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
            return res.json({
                message: 'User fetched successfully',
                data: { users },
            });
        } catch (error) {
            console.error(`[GET] User error: ${error.message}`);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.post(
        '/users',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            try {
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
                    join_date: getCurrentDatetime(),
                };

                await Users().insert(newUser);

                return res.status(201).json({
                    message: 'User created successfully',
                    data: {},
                });
            } catch (error) {
                console.error(`[POST] User error: ${error.message}`);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
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
                // const passwordHash = await hashPassword(req.body.password);

                const userData = {
                    name: req.body.name,
                    surname: req.body.surname,
                    e_mail: req.body.email,
                    // username: req.body.username,
                    // password: passwordHash,
                    profile_picture_key: req.body.profile_picture_key,
                    bio: req.body.bio,
                    type: req.body.type,
                };

                const userQuery = Users().where({ id });
                const user = await userQuery.first();

                if (!user) {
                    console.error('[PATCH] User error: User not found');
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                await userQuery.update(userData);

                return res.json({
                    message: 'User updated successfully',
                    data: {},
                });
            } catch (error) {
                console.error(`[PATCH] User error: ${error.message}`);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
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

                const userQuery = Users().where({ id });
                const user = await userQuery.first();
                if (!user) {
                    console.error('[DELETE] User error: User not found');
                    return res.status(500).json({
                        message: 'Internal server error',
                        data: {},
                    });
                }

                await userQuery.del();
                return res.status(204).end();
            } catch (error) {
                console.error('[DELETE] User error:', error.message);
                return res.status(500).json({
                    message: 'Internal server error',
                    data: {},
                });
            }
        }
    );

    return router;
};
