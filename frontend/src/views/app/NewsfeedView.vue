<template>
    <div>
        <div class="card border-0">
            <h1>Naslovnica</h1>
        </div>

        <add-announcement
            v-if="isDemos"
            :userData="currentUserData"
            :profilePictureKey="profilePictureKey"
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
            :announcementData="announcement"
            :setEditingAnnouncementID="setEditingAnnouncementID"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreAnnouncement } from "@/stores/announcement.store";

import { displayImage } from "@/services/displayImageService";
import eventBus from "@/eventBus";

import addAnnouncement from "@/components/app/addAnnouncement.vue";
import showAnnouncement from "@/components/app/showAnnouncement.vue";

import userTypeEnum from "@/enums/userTypeEnum";

export default {
    name: "NewsfeedView",
    data() {
        return {
            currentUserData: {},
            announcements: [],
            editingAnnouncementID: null,
            profilePictureKey: "",
            storeUser: useStoreUser(),
            storeAnnouncement: useStoreAnnouncement(),
            isDemos: userTypeEnum.DEMOS === localStorage.getItem("type"),
        };
    },
    components: {
        addAnnouncement,
        showAnnouncement,
    },
    async created() {
        await this.storeUser.fetchUser();
        this.currentUserData = await this.storeUser.getCurrentUser();
        this.announcements = await this.storeAnnouncement.fetchAnnouncement();

        this.profilePictureKey = await displayImage(this.currentUserData.profile_picture_key);
    },
    methods: {
        setEditingAnnouncementID(editingAnnouncementID) {
            if (this.editingAnnouncementID === editingAnnouncementID) {
               return;
            }

            const isEditActive = false;
            eventBus.emit("closeOpenedAnnouncementEdit", isEditActive);
            this.editingAnnouncementID = editingAnnouncementID;
        }
    },
};
</script>
