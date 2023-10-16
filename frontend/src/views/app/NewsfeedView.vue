<template>
    <div>
        <div class="card border-0">
            <h1>Naslovnica</h1>
        </div>

        <add-announcement
            v-if="isAuthUserDemos && currentUser"
            :userProfilePictureSrc="currentUser.profilePictureSrc"
        />

        <div
            class="d-flex justify-content-center"
            v-if="announcements.length === 0"
        >
            <h1 class="mt-5">Nema obavijesti...</h1>
        </div>

        <show-announcement
            v-for="announcement in announcements"
            :key="announcement.id"
            :announcement="announcement"
            :getEditingAnnouncementID="getEditingAnnouncementID"
            :setEditingAnnouncementID="setEditingAnnouncementID"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'
import { useStoreAnnouncement } from '@/stores/announcement.store'

import authService from '@/services/authService'
import dateService from '@/services/dateService'

import addAnnouncement from '@/components/app/addAnnouncement.vue'
import showAnnouncement from '@/components/app/showAnnouncement.vue'

export default {
    name: 'NewsfeedView',
    components: {
        addAnnouncement,
        showAnnouncement,
    },
    data: () => ({
        currentUser: {},
        announcements: [],
        activeEditingAnnouncementID: 0,
    }),
    async created() {
        const storeUser = useStoreUser()
        const storeAnnouncement = useStoreAnnouncement()

        await storeUser.fetchUsers()
        this.currentUser = await storeUser.getUserByUsername(
            authService.getAuthUsername()
        )

        const announcements = await storeAnnouncement.fetchAnnouncement()

        const announcementsWithAuthor = await Promise.all(
            announcements.map(async (announcement) => ({
                ...announcement,
                author: await storeUser.getUserByID(announcement.author_id),
            }))
        )

        this.announcements = announcementsWithAuthor
    },
    methods: {
        getEditingAnnouncementID() {
            return this.activeEditingAnnouncementID
        },
        setEditingAnnouncementID(editingAnnouncementID) {
            this.activeEditingAnnouncementID = editingAnnouncementID
        },
        isAuthUserDemos() {
            return authService.isAuthUserDemos()
        },
    },
}
</script>
