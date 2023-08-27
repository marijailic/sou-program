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
        async createProfilePost(profilePostData) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/create-profile-post`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify(profilePostData),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async deleteProfilePost(idPost) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/delete-profile-post`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        RefreshToken: refreshToken,
                        Username: username,
                    },
                    body: JSON.stringify({ id: idPost }),
                }
            );

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async updateProfilePost(updateData) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(
                `${process.env.VUE_APP_URL}/update-profile-post`,
                {
                    method: "POST",
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
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
    },
});
