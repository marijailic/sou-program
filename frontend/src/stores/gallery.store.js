import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";

export const useStoreGallery = defineStore("storeGallery", {
    state: () => ({
        gallery: [],
    }),
    getters: {},
    actions: {
        async fetchGallery() {
            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                headers: getAuthHeaders(),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.gallery = resObj.data;

            return resObj.data;
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
        async uploadImages(images) {
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
        async createGallery(galleryData) {
            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(galleryData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            // window.location.href = "/success";
        },
    },
});
