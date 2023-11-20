import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { demosMiddleware } from '../middlewares/demosMiddleware';
import { Galleries, GalleryItems } from '../models/models';
import { getCurrentDatetime } from '../services/datetimeService';

export const galleryRoutes = () => {
    const router = Router();

    router.get(
        '/gallery-item/:gallery_id',
        authMiddleware,
        async (req, res) => {
            const galleryID = req.params.gallery_id;

            try {
                const galleryItem = await GalleryItems()
                    .where({
                        gallery_id: galleryID,
                    })
                    .orderBy('timestamp', 'asc');

                return res.json({
                    message: 'Gallery item fetched successfully',
                    data: galleryItem,
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

    router.get('/gallery', authMiddleware, async (req, res) => {
        try {
            const gallery = await Galleries()
                .orderBy('timestamp', 'desc')
                .limit(10);

            return res.json({
                message: 'Gallery fetched successfully',
                data: gallery,
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.delete(
        '/gallery',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const idGallery = req.body.id;

            try {
                await Galleries().where({ id: idGallery }).del();
                return res.json({
                    message: 'Gallery deleted successfully',
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

    router.post('/gallery', authMiddleware, async (req, res) => {
        const { title, text, author_id } = req.body;

        if (title.trim() === '' || text.trim() === '') {
            return res.status(400).json({ message: 'Client error', data: {} });
        }

        const galleryData = {
            title: title,
            text: text,
            author_id: author_id,
            timestamp: getCurrentDatetime(),
        };

        try {
            const gallery = await Galleries()
                .returning('id')
                .insert(galleryData);
            const galleryID = gallery[0];

            return res.json({
                message: 'Gallery created successfully',
                data: { galleryID },
            });
        } catch (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                data: {},
            });
        }
    });

    router.post(
        '/gallery-item/:gallery_id',
        authMiddleware,
        async (req, res) => {
            const galleryID = req.params.gallery_id;
            const imageIDs = req.body.galleryItemIDs;

            try {
                for (let i = 0; i < imageIDs.length; i++) {
                    const galleryItemData = {
                        picture_key: imageIDs[i],
                        gallery_id: galleryID,
                        timestamp: getCurrentDatetime(),
                    };

                    await GalleryItems().insert(galleryItemData);
                }

                return res.json({
                    message: 'Gallery items created successfully',
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

    router.patch(
        '/update-gallery',
        [authMiddleware, demosMiddleware],
        async (req, res) => {
            const { id, title, text } = req.body;

            if (title.trim() === '' || text.trim() === '') {
                return res
                    .status(400)
                    .json({ message: 'Client error', data: {} });
            }

            const galleryData = {
                title: title,
                text: text,
            };

            try {
                await Galleries().where({ id: id }).update(galleryData);
                return res.json({
                    message: 'Gallery updated successfully',
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
