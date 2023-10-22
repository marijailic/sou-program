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

        <div class="mt-2 d-flex justify-content-center">
            <LoadingSpinner :isLoading="isLoading" />
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';
import { useStoreAnnouncement } from '@/stores/announcement.store';

import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

import authService from '@/services/authService';

import addAnnouncement from '@/components/app/addAnnouncement.vue';
import showAnnouncement from '@/components/app/showAnnouncement.vue';

export default {
    name: 'NewsfeedView',
    components: {
        addAnnouncement,
        showAnnouncement,
        LoadingSpinner,
    },
    data: () => ({
        pageCount: 0,
        isLoading: false,
        currentUser: {},
        announcements: [],
        storeAnnouncement: useStoreAnnouncement(),
        storeUser: useStoreUser(),
        activeEditingAnnouncementID: 0,
    }),
    async created() {
        await this.storeUser.fetchUsers();
        this.currentUser = await this.storeUser.getUserByUsername(
            authService.getAuthUsername()
        );
        await this.loadMoreAnnouncements();
    },
    mounted() {
        this.handleScroll();
    },
    computed: {
        isAuthUserDemos() {
            return authService.isAuthUserDemos();
        },
    },
    methods: {
        handleScroll() {
            window.onscroll = async () => {
                const OFFSET = 100;
                const bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight >=
                    document.documentElement.offsetHeight - OFFSET;

                if (bottomOfWindow && !this.isLoading) {
                    this.isLoading = true;
                    await this.loadMoreAnnouncements();
                    this.isLoading = false;
                }
            };
        },
        getEditingAnnouncementID() {
            return this.activeEditingAnnouncementID;
        },
        setEditingAnnouncementID(editingAnnouncementID) {
            this.activeEditingAnnouncementID = editingAnnouncementID;
        },
        async getAnnouncementsWithAuthor(announcements) {
            return await Promise.all(
                announcements.map(async (announcement) => ({
                    ...announcement,
                    author: await this.storeUser.getUserByID(
                        announcement.author_id
                    ),
                }))
            );
        },
        async loadMoreAnnouncements() {
            this.pageCount++;

            const moreAnnouncements =
                await this.storeAnnouncement.fetchAnnouncements(this.pageCount);

            const moreAnnouncementsWithAuthor =
                await this.getAnnouncementsWithAuthor(moreAnnouncements);

            this.announcements.push(...moreAnnouncementsWithAuthor);
        },
    },
};
</script>
