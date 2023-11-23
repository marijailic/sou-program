import { useStoreGallery } from '@/stores/gallery.store';

export default {
    async getImageSrc(imageID) {
        if (!imageID) {
            return '';
        }
        const storeGallery = useStoreGallery();
        const imageBase64 = await storeGallery.getImage(imageID);
        return imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : '';
    },
};
