import { defineStore } from "pinia";

export const useStoreGallery = defineStore("storeGallery", {
    state: () => ({
        gallery: [],
    }),
    getters: {},
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
    },
});
