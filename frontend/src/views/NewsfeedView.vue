<template>
    <div>
        <div class="card">
            <h1>Naslovnica</h1>
        </div>

        <add-announcement :userData="currentUserData" />

        <div class="d-flex justify-content-center">
            <h1 class="mt-5" v-if="announcements.length === 0">
                Nema obavijesti...
            </h1>
        </div>

        <show-announcement
            v-for="announcement in announcements"
            :key="announcement.id"
            :announcementData="announcement"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreAnnouncement } from "@/stores/announcement.store";

import addAnnouncement from "@/components/addAnnouncement.vue";
import showAnnouncement from "@/components/showAnnouncement.vue";

export default {
    name: "NewsfeedView",
    data() {
        return {
            currentUserData: {},
            announcements: [],
        };
    },
    components: {
        addAnnouncement,
        showAnnouncement,
    },
    setup() {
        const currentUserUsername = localStorage.getItem("username");
        const storeUser = useStoreUser();
        const storeAnnouncement = useStoreAnnouncement();

        return { storeUser, storeAnnouncement, currentUserUsername };
    },
    created() {
        this.getCurrentUser();
        this.getAnnouncements();
    },
    methods: {
        async getCurrentUser() {
            await this.storeUser.fetchUser();
            const currentUserData = await this.storeUser.getCurrentUser(
                this.currentUserUsername
            );
            this.currentUserData = currentUserData;
        },
        async getAnnouncements() {
            const announcements =
                await this.storeAnnouncement.fetchAnnouncement();
            this.announcements = announcements;
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
}
</style>
