import { Router } from 'express';
import ProfilePostController from '../controllers/ProfilePostController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    createProfilePostValidation,
    updateProfilePostValidation,
} from '../validation/profilePostValidation.js';

export const profilePostRoutes = () => {
    const router = Router();

    router.get(
        '/profile-posts',
        [authMiddleware],
        ProfilePostController.getPaginatedProfilePosts
    );

    router.post(
        '/profile-posts',
        [authMiddleware, createProfilePostValidation],
        ProfilePostController.createProfilePost
    );

    router.patch(
        '/profile-posts/:id',
        [authMiddleware, updateProfilePostValidation],
        ProfilePostController.updateProfilePost
    );

    router.delete(
        '/profile-posts/:id',
        [authMiddleware],
        ProfilePostController.deleteProfilePost
    );

    return router;
};
