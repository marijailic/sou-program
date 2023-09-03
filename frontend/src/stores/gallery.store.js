import { defineStore } from "pinia";

export const useStoreGallery = defineStore("storeGallery", {
    state: () => ({
        gallery: [],
    }),
    getters: {
        // getAllGalleries: (state) => () => {
        //     const galleries = state.gallery;
        //     return galleries;
        // },
    },
    actions: {
        async fetchGallery() {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/gallery`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
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
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/delete-gallery`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify({ id: idGallery }),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async createGallery(newGallery) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/gallery`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify(newGallery),
                }
            );

            const data = await res.json();
            console.log("Create Gallery:", data)

            if (!res.ok) {
                //window.location.href = "/error";
                return;
            }

            return data.data.id;
        },
        async updateGallery(updateData) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/update-gallery`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify(updateData),
                }
            );

            if (!res.ok) {
                //window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async createGalleryItems(galleryId, galleryItemIds) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/gallery/${galleryId}/items`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify({
                        picture_keys: galleryItemIds
                    }),
                }
            );

            // if (!res.ok) {
            //     window.location.href = "/error";
            // }
            return;
        },
        async createFullGallery(galleryBody, images) {
            const galleryId = await this.createGallery(galleryBody);
            const galleryItemIds = await this.uploadImages(images);
            await this.createGalleryItems(galleryId, galleryItemIds)

            //window.location.href = "/success";
        },
        async showImage(imageId) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/image/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return undefined;
            }

            return data.data;
        },
        async uploadImages(images) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const galleryItemIds = []
            images.forEach(async (image) => {
                const imageName = username + "-" + Date.now() + "-" + Math.floor(Math.round() * 101);
                console.log(imageName);
                const res = await fetch(
                    `${process.env.VUE_APP_URL}/upload/folder/gallery/${imageName}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            RefreshToken: refreshToken,
                            Username: username,
                        },
                        body: image,
                    }
                );
                if (!res.ok) {
                    //window.location.href = "/error";
                    return;
                }

                const data = await res.json();
                console.log("uploadImages Id:", data.data.id);
                galleryItemIds.push(data.data.id);
            })

            return galleryItemIds;
        }
    },
});
