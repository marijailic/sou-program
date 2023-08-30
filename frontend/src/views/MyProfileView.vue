<template>
    <div>
        <show-profile :userData="currentUserData" />
        <add-profile-post :userData="currentUserData" />

        <div class="d-flex justify-content-center">
            <h1 class="mt-5" v-if="currentUserPosts.length === 0">
                Nema objava...
            </h1>
        </div>

        <show-profile-post
            :parentComponent="parentComponent"
            :userData="currentUserData"
            v-for="post in currentUserPosts"
            :key="post.id"
            :postData="post"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";

import showProfile from "@/components/showProfile.vue";
import addProfilePost from "../components/addProfilePost.vue";
import showProfilePost from "@/components/showProfilePost.vue";

export default {
    name: "MyProfileView",
    components: { showProfile, addProfilePost, showProfilePost },
    data() {
        return {
            currentUserData: {},
            currentUserPosts: [],
            parentComponent: "MyProfileView",
        };
    },
    setup() {
        const currentUserUsername = localStorage.getItem("username");
        const storeUser = useStoreUser();
        const storeProfilePost = useStoreProfilePost();

        return { storeUser, storeProfilePost, currentUserUsername };
    },
    async created() {
        await this.getCurrentUser();
        await this.getCurrentUserPosts();
    },
    methods: {
        async getCurrentUser() {
            await this.storeUser.fetchUser();
            const currentUserData = await this.storeUser.getCurrentUser(
                this.currentUserUsername
            );
            this.currentUserData = currentUserData;
        },
        async getCurrentUserPosts() {
            const currentUserPosts =
                await this.storeProfilePost.fetchProfilePost(
                    this.currentUserData.id
                );
            this.currentUserPosts = currentUserPosts;
        },
    },
};
</script>
