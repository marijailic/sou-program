import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";
import backendApiService from "@/services/backendApiService";

export const useStoreProfilePost = defineStore("storeProfilePost", {
    state: () => ({
        profilePost: [],
    }),
    actions: {
        async fetchProfilePost(authorId) {
            const res = await backendApiService.get({
                url: `/profile-post/${authorId}`,
            });

            if (!res.ok) {
                //window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.profilePost = resObj.data;

            return resObj.data;
        },
        async createProfilePost(profilePostData) {
            const res = await backendApiService.post({
                url: "/create-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profilePostData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async deleteProfilePost(idPost) {
            const res = await backendApiService.delete({
                url: "/delete-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idPost }),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateProfilePost(updateData) {
            const res = await backendApiService.post({
                url: "/update-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
