import { defineStore } from "pinia";
import backendApiService from "@/services/backendApiService";
import dateService from "@/services/dateService";

export const useStoreProfilePost = defineStore("storeProfilePost", {
    state: () => ({
        profilePosts: [],
    }),
    actions: {
        async fetchProfilePost(authorID) {
            const res = await backendApiService.get({
                url: `/profile-post/${authorID}`,
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();

            this.profilePosts = await Promise.all(
                resObj.data.map(async (profilePost) => ({
                    ...profilePost,
                    posted_at: dateService.getRelativeTime(profilePost.timestamp),
                }))
            );

            return this.profilePosts;
        },
        async createProfilePost(profilePost) {
            const res = await backendApiService.post({
                url: "/create-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profilePost),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async deleteProfilePost(profilePostID) {
            const res = await backendApiService.delete({
                url: "/delete-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: profilePostID }),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateProfilePost(profilePost) {
            const res = await backendApiService.post({
                url: "/update-profile-post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profilePost),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
