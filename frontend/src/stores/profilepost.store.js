import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";

export const useStoreProfilePost = defineStore("storeProfilePost", {
    state: () => ({
        profilePost: [],
    }),
    actions: {
        async fetchProfilePost(authorId) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/profile-post/${authorId}`,
                {
                    headers: getAuthHeaders(),
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
            const res = await fetch(
                `${process.env.VUE_APP_URL}/create-profile-post`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(profilePostData),
                }
            );

            window.location.href = res.ok ? "/success" : "/error";
        },
        async deleteProfilePost(idPost) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/delete-profile-post`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify({ id: idPost }),
                }
            );

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateProfilePost(updateData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/update-profile-post`,
                {
                    method: "POST",
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
