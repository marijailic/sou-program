import { defineStore } from 'pinia';
import backendApiService from '@/services/backendApiService';
import dateService from '@/services/dateService';

export const useStoreAnnouncement = defineStore('storeAnnouncement', {
    state: () => ({
        announcements: [],
    }),
    actions: {
        async fetchAnnouncements(pageCount) {
            const res = await backendApiService.get({
                url: `/announcement?page_count=${pageCount}`,
            });

            if (!res.ok) {
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();

            this.announcements = resObj.data.map((announcement) => ({
                ...announcement,
                posted_at: dateService.getRelativeTime(announcement.timestamp),
                text_line_breaks: announcement.text.replace(/\n/g, '<br>'),
            }));

            return this.announcements;
        },
        async deleteAnnouncement(announcementID) {
            const res = await backendApiService.delete({
                url: '/delete-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: announcementID }),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async createAnnouncement(announcement) {
            const res = await backendApiService.post({
                url: '/create-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async updateAnnouncement(announcement) {
            const res = await backendApiService.post({
                url: '/update-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
    },
});
