import { defineStore } from "pinia";

export const useStoreProfilePost = defineStore("storeProfilePost", {
    state: () => ({
        profilePost: [],
    }),
    actions: {
        async fetchProfilePost(authorId) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/profile-post/${authorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.profilePost = resObj.data;

            return resObj.data;
        },
    },
});
