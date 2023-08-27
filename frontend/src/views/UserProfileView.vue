<template>
    <div class="profile container">
        <show-profile :userData="userData" />
        <h1 class="mt-5" v-if="currentUserPosts.length === 0">
            Nema objava...
        </h1>
        <show-profile-post
            :userData="userData"
            v-for="post in currentUserPosts"
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
            currentUserPosts: [],
        };
    },
    setup() {
        const currentUserUsername = localStorage.getItem("username");
        const storeUser = useStoreUser();
        const storeProfilePost = useStoreProfilePost();

        // get user id from url
        const route = useRoute();
        const userID = route.params.id;
        console.log("SETUP", userID);

        return { storeUser, storeProfilePost, currentUserUsername, userID };
    },
    async created() {
        await this.getCurrentUser();
        // await this.getCurrentUserPosts();
    },
    methods: {
        async getCurrentUser() {
            console.log(this.userID);
            await this.storeUser.fetchUser();
            const userData = await this.storeUser.getUserById(this.userID);
            this.userData = userData;
            console.log(userData);
        },
        // async getCurrentUserPosts() {
        //     const currentUserPosts =
        //         await this.storeProfilePost.fetchProfilePost(
        //             this.currentUserData.id
        //         );
        //     this.currentUserPosts = currentUserPosts;
        // },
    },
};
</script>

<style scoped>
.profile {
    margin-top: 3vw;
    margin-bottom: 3vw;
}
</style>
