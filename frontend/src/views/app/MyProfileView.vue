<template>
    <div class="d-flex flex-column gap-2 h-100">
        <show-profile :user="currentUser" />
        <add-profile-post :profilePictureSrc="currentUser.profilePictureSrc" />

        <div class="card" v-if="!profilePosts.length && !isLoading">
            <div class="card-body text-center">
                <h4>Nema objava 😢</h4>
            </div>
        </div>

        <show-profile-post
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="currentUser"
            :profilePost="profilePost"
        />

        <div
            class="d-flex align-items-center justify-content-center flex-grow-1"
            v-if="isLoading"
        >
            <LoadingSpinner />
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';
import { useStoreProfilePost } from '@/stores/profilepost.store';

import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

import authService, { getAuthData } from '@/services/authService';

import showProfile from '@/components/app/showProfile.vue';
import addProfilePost from '@/components/app/addProfilePost.vue';
import showProfilePost from '@/components/app/showProfilePost.vue';

export default {
    name: 'MyProfileView',
    components: {
        showProfile,
        addProfilePost,
        showProfilePost,
        LoadingSpinner,
    },
    data: () => ({
        pageCount: 0,
        isLoading: false,
        currentUser: {},
        profilePosts: [],
        storeUser: useStoreUser(),
        storeProfilePost: useStoreProfilePost(),
    }),
    async created() {
        this.isLoading = true;

        await this.storeUser.fetchUsers();
        this.currentUser = this.storeUser.getUserByID(getAuthData().id);

        await this.loadMoreProfilePosts();

        this.isLoading = false;
    },
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleScroll() {
            window.onscroll = async () => {
                const OFFSET = 100;
                const bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight >=
                    document.documentElement.offsetHeight - OFFSET;

                const isOverFinalPage =
                    this.pageCount > this.storeProfilePost.totalPages;

                if (bottomOfWindow && !this.isLoading && !isOverFinalPage) {
                    this.isLoading = true;
                    await this.loadMoreProfilePosts();
                    this.isLoading = false;
                }
            };
        },
        async loadMoreProfilePosts() {
            this.pageCount++;

            const moreProfilePosts =
                await this.storeProfilePost.fetchProfilePosts(
                    this.currentUser.id,
                    this.pageCount
                );

            this.profilePosts.push(...moreProfilePosts);
        },
    },
};
</script>
