import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { demosMiddleware } from '../middlewares/demosMiddleware.js';
import {
    getUsersValidation,
    updateUserValidation,
    createUserValidation,
} from '../validation/userValidation.js';

export const userRoutes = () => {
    const router = Router();

    router.get(
        '/users',
        [authMiddleware, getUsersValidation],
        UserController.getUsers
    );

    router.post(
        '/users',
        [authMiddleware, demosMiddleware, createUserValidation],
        UserController.createUser
    );

    router.patch(
        '/users/:id',
        [authMiddleware, demosMiddleware, updateUserValidation],
        UserController.updateUser
    );

    router.delete(
        '/users/:id',
        [authMiddleware, demosMiddleware],
        UserController.deleteUser
    );

    return router;
};
