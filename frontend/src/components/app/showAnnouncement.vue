<template>
    <div>
        <div class="card border-0 mt-3 p-0">
            <div class="d-flex gap-3 p-3">
                <div class="my-auto">
                    <img
                        class="profile-pic rounded-circle"
                        :src="
                            userProfilePictureSrc ||
                            require('@/assets/sp-icon.png')
                        "
                    />
                </div>
                <div class="flex-grow-1">
                    <div class="card-right card-body">
                        <h5 class="card-title d-inline">
                            {{ authorFullName }}
                        </h5>
                        <span class="text-muted">
                            •
                            {{ announcement.posted_at }}
                            ago
                        </span>
                        <p class="card-text mt-2">
                            {{ announcement.text }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="isAuthUserDemos" class="card-footer bg-white text-end">
                <button
                    @click="deleteAnnouncement(announcement.id)"
                    class="btn btn-primary me-2"
                >
                    Izbriši
                </button>
                <button
                    class="btn btn-primary"
                    @click="openEditing(announcement.id)"
                >
                    Uredi
                </button>
            </div>
        </div>

        <edit-announcement
            v-if="isAuthUserDemos && isEditingActive"
            :announcement="announcement"
            :closeEditing="closeEditing"
        />
    </div>
</template>

<script>
import { useStoreAnnouncement } from '@/stores/announcement.store';

import authService from '@/services/authService';

import editAnnouncement from './editAnnouncement.vue';
import userTypeEnum from '@/enums/userTypeEnum';

const props = {
    announcement: {
        type: Object,
        required: true,
    },
    setEditingAnnouncementID: {
        type: Function,
        required: true,
    },
    getEditingAnnouncementID: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'showAnnouncement',
    props,
    components: {
        editAnnouncement,
    },
    data: () => ({
        isAuthUserDemos: authService.isAuthUserDemos(),
        userProfilePictureSrc: '',
        storeAnnouncement: useStoreAnnouncement(),
    }),
    async created() {
        this.userProfilePictureSrc = await this.announcement.author
            .profilePictureSrc;
    },
    computed: {
        isEditingActive() {
            return this.announcement.id === this.getEditingAnnouncementID();
        },
        authorFullName() {
            return `${this.announcement.author.name} ${this.announcement.author.surname}`;
        },
    },
    methods: {
        async deleteAnnouncement(announcementID) {
            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati objavu?'
            );

            if (isConfirmed) {
                await this.storeAnnouncement.deleteAnnouncement(announcementID);
            }
        },
        openEditing(editingAnnouncementID) {
            this.setEditingAnnouncementID(editingAnnouncementID);
        },
        closeEditing() {
            this.setEditingAnnouncementID(0);
        },
    },
};
</script>

<style scoped>
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
