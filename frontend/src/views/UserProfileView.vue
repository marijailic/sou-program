<template>
    <div class="container">
        <show-profile :userData="userData" />
        <h1 class="mt-5" v-if="userPosts.length === 0">Nema objava...</h1>
        <show-profile-post
            :parentComponent="parentComponent"
            :userData="userData"
            v-for="post in userPosts"
            :key="post.id"
            :postData="post"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";

import { useRoute } from "vue-router";

import showProfile from "@/components/showProfile.vue";
import showProfilePost from "@/components/showProfilePost.vue";

export default {
    name: "UserProfileView",
    components: { showProfile, showProfilePost },
    data() {
        return {
            userData: {},
            userPosts: [],
            parentComponent: "UserProfileView",
        };
    },
    setup() {
        const storeUser = useStoreUser();
        const storeProfilePost = useStoreProfilePost();

        // get user id from url
        const route = useRoute();
        const userID = route.params.id;

        return { storeUser, storeProfilePost, userID };
    },
    async created() {
        await this.getUser();
        await this.getUserPosts();
    },
    methods: {
        async getUser() {
            await this.storeUser.fetchUser();
            const userData = await this.storeUser.getUserById(this.userID);
            this.userData = userData;
        },
        async getUserPosts() {
            const userPosts = await this.storeProfilePost.fetchProfilePost(
                this.userID
            );
            this.userPosts = userPosts;
        },
    },
};
</script>
