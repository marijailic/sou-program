import { defineStore } from "pinia";
import backendApiService from "@/services/backendApiService";

export const useStoreAnnouncement = defineStore("storeAnnouncement", {
    state: () => ({
        announcement: [],
    }),
    getters: {},
    actions: {
        async fetchAnnouncement() {
            const res = await backendApiService.get({
                url: "/announcement",
            });

            console.log(res)
            if (!res.ok) {
                //window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.announcement = resObj.data;

            return resObj.data;
        },
        async deleteAnnouncement(idAnnouncement) {
            const res = await backendApiService.delete({
                url: "/delete-announcement",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idAnnouncement }),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async createAnnouncement(announcementData) {
            const res = await backendApiService.post({
                url: "/create-announcement",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(announcementData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateAnnouncement(updateData) {
            const res = await backendApiService.post({
                url: "/update-announcement",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
