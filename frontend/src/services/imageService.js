import { useStoreGallery } from "@/stores/gallery.store";

export default {
    async getImageSrc(imageID) {
        const storeGallery = useStoreGallery();
        try {
            const image = await storeGallery.getBase64Image(imageID);
            return `data:image/jpeg;base64,${image}`;
        }
        catch (err) {
            console.log(err);
        }
    }
}