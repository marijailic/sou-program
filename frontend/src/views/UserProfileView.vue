<template>
    <div>
        <show-profile
            :parentComponent="parentComponent"
            :userData="userData"
            :userProfilePictureKey="userProfilePictureKey"
        />

        <div
            class="d-flex justify-content-center"
            v-if="userPosts.length === 0"
        >
            <h1 class="mt-5">Nema objava...</h1>
        </div>

        <show-profile-post
            :parentComponent="parentComponent"
            :userData="userData"
            :userProfilePictureKey="userProfilePictureKey"
            v-for="post in userPosts"
            :key="post.id"
            :postData="post"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";
import { useStoreGallery } from "@/stores/gallery.store";

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
            userProfilePictureKey: "",
        };
    },
    setup() {
        const storeUser = useStoreUser();
        const storeProfilePost = useStoreProfilePost();
        const storeGallery = useStoreGallery();

        // get user id from url
        const route = useRoute();
        const userID = route.params.id;

        return { storeUser, storeProfilePost, storeGallery, userID };
    },
    async created() {
        await this.getUser();
        await this.getUserPosts();

        const profilePictureKey = this.userData.profile_picture_key;
        await this.displayImage(profilePictureKey);
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
        async displayImage(imageID) {
            const image = await this.storeGallery.googleDisplayImage(imageID);
            this.userProfilePictureKey = `data:image/jpeg;base64,${image}`;
        },
    },
};
</script>
