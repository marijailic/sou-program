import { Router } from 'express';
import { getCurrentDatetime } from '../services/datetimeService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Users } from '../models/models';
import { hashPassword } from '../services/authService';
import {
    updateUserValidation,
    createUserValidation,
} from '../middlewares/validation/userValidation';

export const userRoutes = () => {
    const router = Router();

    router.get('/users', [authMiddleware], async (req, res) => {
        try {
            return res.json({
                message: 'User fetched successfully',
                data: { users: await Users().orderBy('id', 'desc') },
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
        [authMiddleware, demosMiddleware, createUserValidation],
        async (req, res) => {
            try {
                await Users().insert({
                    name: req.body.name.trim(),
                    surname: req.body.surname.trim(),
                    e_mail: req.body.email.trim(),
                    username: req.body.username.trim(),
                    password: await hashPassword(req.body.password),
                    profile_picture_key: req.body.profile_picture_key,
                    bio: req.body.bio.trim(),
                    type: req.body.type,
                    join_date: getCurrentDatetime(),
                });

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
        [authMiddleware, demosMiddleware, updateUserValidation],
        async (req, res) => {
            try {
                await Users().where({ id: req.params.id }).update({
                    name: req.body.name.trim(),
                    surname: req.body.surname.trim(),
                    e_mail: req.body.email.trim(),
                    profile_picture_key: req.body.profile_picture_key,
                    bio: req.body.bio.trim(),
                    type: req.body.type,
                });

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
                await Users().where({ id: req.params.id }).del();
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
