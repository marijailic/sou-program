<template>
    <div class="card">
        <div class="card-body d-flex gap-3">
            <div>
                <router-link
                    v-if="announcement.author"
                    :to="'/user-profile/' + announcement.author.id"
                    class="text-dark d-block icon rounded-circle"
                >
                    <img
                        class="icon rounded-circle"
                        :src="
                            announcement.author.profilePictureSrc ||
                            require('@/assets/sp-icon.png')
                        "
                    />
                </router-link>
                <img
                    v-else
                    class="icon rounded-circle"
                    :src="require('@/assets/sp-icon.png')"
                />
            </div>
            <div class="flex-grow-1">
                <div class="d-flex flex-wrap gap-1">
                    <h6 class="card-title mb-0 d-inline author-full-name">
                        {{
                            announcement.author
                                ? announcement.author.fullName
                                : 'Deleted user'
                        }}
                    </h6>
                    <small class="text-muted posted-at">
                        <span class="dot">•</span>
                        {{ announcement.posted_at }}
                        ago
                    </small>
                </div>
                <p
                    v-html="formatTextWithLineBreaks(announcement.text)"
                    class="card-text mt-1"
                ></p>
            </div>
            <div
                v-if="isAuthUserDemos"
                class="h-fit d-flex justify-content-end gap-1"
            >
                <button class="btn btn-edit" @click="openEditingAnnouncement">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    class="btn btn-delete"
                    @click="openDeletingAnnouncement"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

        <edit-announcement
            v-if="isAuthUserDemos && isEditing"
            :announcement="announcement"
            :onClose="closeEditingAnnouncement"
        />

        <ConfirmationModal
            v-if="isConfirming"
            title="Izbriši objavu"
            message="Jesi li siguran/na da želiš izbrisati objavu?"
            :onConfirm="confirmDeleteAnnouncement"
            :onCancel="cancelDeleteAnnouncement"
        />
    </div>
</template>

<script>
import { useStoreAnnouncement } from '@/stores/announcement.store';

import { isAuthUserDemos } from '@/services/authService';

import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import editAnnouncement from '@/components/app/editAnnouncement.vue';

const props = {
    announcement: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'showAnnouncement',
    props,
    components: {
        editAnnouncement,
        ConfirmationModal,
    },
    data: () => ({
        isAuthUserDemos: isAuthUserDemos(),
        storeAnnouncement: useStoreAnnouncement(),
        isConfirming: false,
        isEditing: false,
    }),
    created() {
        const authorFullNames =
            document.getElementsByClassName('author-full-name');
        const postedAts = document.getElementsByClassName('posted-at');
        const dots = document.getElementsByClassName('dot');

        const checkLine = () => {
            for (let i = 0; i < authorFullNames.length; i++) {
                const authorRect = authorFullNames[i].getBoundingClientRect();
                const postedAtRect = postedAts[i].getBoundingClientRect();

                if (authorRect.bottom <= postedAtRect.top) {
                    dots[i].classList.add('hide-dot');
                } else {
                    dots[i].classList.remove('hide-dot');
                }
            }
        };

        window.onload = checkLine;
        window.onresize = checkLine;
    },
    methods: {
        formatTextWithLineBreaks(text) {
            return text.replace(/\n/g, '<br>');
        },
        openDeletingAnnouncement() {
            this.isConfirming = true;
        },
        async confirmDeleteAnnouncement() {
            await this.storeAnnouncement.deleteAnnouncement(
                this.announcement.id
            );

            this.isConfirming = false;
        },
        cancelDeleteAnnouncement() {
            this.isConfirming = false;
        },
        openEditingAnnouncement() {
            this.isEditing = true;
        },
        closeEditingAnnouncement() {
            this.isEditing = false;
        },
    },
};
</script>

<style scoped>
.hide-dot {
    display: none;
}
</style>
