import { defineStore } from "pinia";
import { getAuthHeaders } from "@/services/authService";
import BackendApiService from "@/services/BackendApiService";

export const useStoreAnnouncement = defineStore("storeAnnouncement", {
    state: () => ({
        announcement: [],
    }),
    getters: {},
    actions: {
        async fetchAnnouncement() {
            const res = await fetch(`${process.env.VUE_APP_URL}/announcement`, {
                headers: getAuthHeaders(),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.announcement = resObj.data;

            return resObj.data;
        },
        async deleteAnnouncement(idAnnouncement) {
            const res = await BackendApiService.delete({
                url: "/delete-announcement",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idAnnouncement }),
            });

            /*
            const res = await fetch(`${process.env.VUE_APP_URL}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({ id: idAnnouncement }),
            });*/

            window.location.href = res.ok ? "/success" : "/error";
        },
        async createAnnouncement(announcementData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/create-announcement`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(announcementData),
                }
            );

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateAnnouncement(updateData) {
            const res = await fetch(
                `${process.env.VUE_APP_URL}/update-announcement`,
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
