import { useStoreGallery } from "@/stores/gallery.store";

export const displayImage = async (imageID) => {
    const storeGallery = useStoreGallery();
    const image = await storeGallery.googleDisplayImage(imageID);
    return `data:image/jpeg;base64,${image}`;
}