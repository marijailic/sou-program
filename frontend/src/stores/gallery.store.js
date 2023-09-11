import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";

export const useStoreGallery = defineStore("storeGallery", {
    state: () => ({
        gallery: [],
    }),
    getters: {
        getGalleryById: (state) => (galleryID) => {
            const gallery = state.gallery.find((gallery) => {
                return gallery.id === Number(galleryID);
            });
            return gallery;
        },
    },
    actions: {
        async fetchGalleryItem(galleryID) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/gallery-item/${galleryID}`,
                {
                    headers: getAuthHeaders(),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();

            return resObj.data;
        },
        async fetchGallery() {
            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                headers: getAuthHeaders(),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            let galleries = resObj.data;

            for (const gallery of galleries) {
                const galleryItems = await this.fetchGalleryItem(gallery.id);
                const imageKeys = galleryItems.map(
                    (galleryItem) => galleryItem.picture_key
                );
                gallery.images = imageKeys;
            }

            this.gallery = galleries;
            return galleries;
        },
        async deleteGallery(idGallery) {
            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({ id: idGallery }),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async googleUploadImages(images) {
            const username = localStorage.getItem("username");
            let galleryItemIDs = [];

            for (const image of images) {
                const folderName = "gallery";
                const imageName =
                    username +
                    "-" +
                    Date.now() +
                    "-" +
                    Math.floor(Math.random() * 101);

                const res = await fetch(
                    `${process.env.VUE_APP_URL}/upload-image/${folderName}/${imageName}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "text/plain",
                            ...getAuthHeaders(),
                        },
                        body: image,
                    }
                );

                if (!res.ok) {
                    window.location.href = "/error";
                    return;
                }

                const resObj = await res.json();
                galleryItemIDs.push(resObj.data);
            }

            return galleryItemIDs;
        },
        async createGalleryItem(galleryID, galleryItemIDs) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/gallery-item/${galleryID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify({
                        galleryItemIDs,
                    }),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
        },
        async createGallery(galleryData) {
            const galleryItemIDs = await this.googleUploadImages(
                galleryData.galleryItemData.images
            );

            if (galleryItemIDs.length === 0) {
                window.location.href = "/error";
                return;
            }

            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(galleryData.galleryData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const galleryObj = await res.json();
            const galleryID = galleryObj.data.galleryID.id;

            await this.createGalleryItem(galleryID, galleryItemIDs);

            window.location.href = "/success";
        },
        async googleDisplayImage(imageID) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/image/${imageID}`,
                {
                    headers: getAuthHeaders(),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();

            return resObj.data;
        },
        async updateGallery(updateData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/update-gallery`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(updateData),
                }
            );

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
