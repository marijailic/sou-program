import { defineStore } from 'pinia'
import backendApiService from '@/services/backendApiService'
import dateService from '@/services/dateService'

export const useStoreAnnouncement = defineStore('storeAnnouncement', {
    state: () => ({
        announcements: [],
    }),
    actions: {
        async fetchAnnouncement() {
            const res = await backendApiService.get({
                url: '/announcement',
            })

            if (!res.ok) {
                window.location.href = '/error'
                return
            }

            const resObj = await res.json()

            this.announcements = await Promise.all(
                resObj.data.map(async (announcement) => ({
                    ...announcement,
                    posted_at: dateService.getRelativeTime(
                        announcement.timestamp
                    ),
                }))
            )

            return this.announcements
        },
        async deleteAnnouncement(announcementID) {
            const res = await backendApiService.delete({
                url: '/delete-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: announcementID }),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async createAnnouncement(announcement) {
            const res = await backendApiService.post({
                url: '/create-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async updateAnnouncement(announcement) {
            const res = await backendApiService.post({
                url: '/update-announcement',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
    },
})
