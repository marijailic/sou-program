<template>
    <div>
        <div class="card border-0">
            <h1>Naslovnica</h1>
        </div>

        <add-announcement
            v-if="storeUser.isCurrentUserDemos && currentUser"
            :userImageSrc="userImageSrc"
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
        userImageSrc: '',
        announcements: [],
        activeEditingAnnouncementID: 0,
        storeUser: useStoreUser(),
        storeAnnouncement: useStoreAnnouncement(),
    }),
    async created() {
        await this.storeUser.fetchUser()
        this.currentUser = await this.storeUser.getCurrentUser()

        this.announcements = await this.storeAnnouncement.fetchAnnouncement()

        this.userImageSrc = await this.currentUser.getProfilePictureSrc()
    },
    methods: {
        getEditingAnnouncementID() {
            return this.activeEditingAnnouncementID
        },
        setEditingAnnouncementID(editingAnnouncementID) {
            this.activeEditingAnnouncementID = editingAnnouncementID
        },
    },
}
</script>
