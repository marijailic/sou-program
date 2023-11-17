import { Router } from 'express';
import AnnouncementController from '../controllers/AnnouncementController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { demosMiddleware } from '../middlewares/demosMiddleware.js';
import {
    createAnnouncementValidation,
    updateAnnouncementValidation,
} from '../validation/announcementValidation.js';

export const announcementRoutes = () => {
    const router = Router();

    router.get(
        '/announcements',
        [authMiddleware],
        AnnouncementController.getPaginatedAnnouncements
    );

    router.post(
        '/announcements',
        [authMiddleware, demosMiddleware, createAnnouncementValidation],
        AnnouncementController.createAnnouncement
    );

    router.patch(
        '/announcements/:id',
        [authMiddleware, demosMiddleware, updateAnnouncementValidation],
        AnnouncementController.updateAnnouncement
    );

    router.delete(
        '/announcements/:id',
        [authMiddleware, demosMiddleware],
        AnnouncementController.deleteAnnouncement
    );

    return router;
};
