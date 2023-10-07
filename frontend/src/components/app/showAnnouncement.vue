<template>
    <div>
        <div class="card border-0 mt-3 p-0">
            <div class="d-flex gap-3 p-3">
                <div class="my-auto">
                    <img
                        class="profile-pic rounded-circle"
                        src="@/assets/sp-icon.png"
                    />
                </div>
                <div class="flex-grow-1">
                    <!-- <div class="card-right card-body">
                        <h5 class="card-title d-inline">
                            {{ announcement.author.name }}
                            {{ announcement.author.surname }}
                        </h5>
                        <span class="text-muted">
                            • {{ announcement.postedAt }} ago
                        </span>
                        <p class="card-text mt-2">
                            {{ announcement.text }}
                        </p>
                    </div> -->

                    <div class="card-right card-body">
                        <h5 class="card-title d-inline">
                            {{ postAuthor.name }}
                            {{ postAuthor.surname }}
                        </h5>
                        <span class="text-muted">
                            • {{ formatDate(announcementData.timestamp) }} ago
                        </span>
                        <p class="card-text mt-2">
                            {{ announcementData.text }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="isDemos" class="card-footer bg-white text-end">
                <button
                    @click="deleteAnnouncement(announcementData.id)"
                    class="btn btn-primary me-2"
                >
                    Izbriši
                </button>
                <button
                    class="btn btn-primary"
                    @click="openEdit(announcementData.id)"
                >
                    Uredi
                </button>
            </div>
        </div>

        <edit-announcement
            :announcementData="announcementData"
            :closeEdit="closeEdit"
            v-if="isEditActive"
        />
    </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";
import { useStoreUser } from "@/stores/user.store";

import { displayImage } from "@/services/displayImageService";
import eventBus from "@/eventBus";
import { formatDistanceToNow } from "date-fns";

import editAnnouncement from "./editAnnouncement.vue";
import userTypeEnum from "@/enums/userTypeEnum";

export default {
    name: "showAnnouncement",
    components: {
        editAnnouncement,
    },
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem("type"),
            postAuthor: {},
            isEditActive: false,
            profilePictureKey: "",
            storeAnnouncement: useStoreAnnouncement(),
            storeUser: useStoreUser(),
        };
    },
    props: {
        announcementData: {
            type: Object,
            required: true,
        },
        setEditingAnnouncementID: {
            type: Function,
            required: true,
        }
    },
    async created() {
        await this.storeUser.fetchUser();
        this.postAuthor = await this.storeUser.getUserById(
            this.announcementData.author_id
        );

        this.profilePictureKey = await displayImage(
            this.postAuthor.profile_picture_key
        );
    },
    methods: {
        closeEdit() {
            this.isEditActive = false;
        },
        formatDate(strDate) {
            const objDate = new Date(strDate);
            return formatDistanceToNow(objDate);
        },
        async deleteAnnouncement(announcementID) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati objavu?"
            );

            if (isConfirmed) {
                await this.storeAnnouncement.deleteAnnouncement(announcementID);
            }
        },
        openedEditCheck() {
            eventBus.on("closeOpenedAnnouncementEdit", (isEditActive) => {
                this.isEditActive = isEditActive;
            });
        },
        openEdit(editingAnnouncementID) {
            this.openedEditCheck();
            this.setEditingAnnouncementID(editingAnnouncementID);
            this.isEditActive = true;
        }
    },
};
</script>

<style scoped>
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
