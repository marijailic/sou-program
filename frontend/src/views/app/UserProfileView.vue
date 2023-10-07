<template>
    <div>
        <!-- <show-profile
            :parentComponent="parentComponent"
            :userData="user"
            :userImageSrc="userImageSrc"
        /> -->

        <div
            class="d-flex justify-content-center"
            v-if="userPosts.length === 0"
        >
            <h1 class="mt-5">Nema objava...</h1>
        </div>
<!-- 
        <show-profile-post
            :parentComponent="parentComponent"
            :userData="user"
            :userImageSrc="userImageSrc"
            v-for="post in userPosts"
            :key="post.id"
            :postData="post"
        /> -->
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";

import { displayImage } from "@/services/displayImageService";
import showProfile from "@/components/app/showProfile.vue";
import showProfilePost from "@/components/app/showProfilePost.vue";

export default {
    name: "UserProfileView",
    components: { showProfile, showProfilePost },
    data() {
        return {
            storeUser: useStoreUser(),
            storeProfilePost: useStoreProfilePost(),
            user: {},
            userPosts: [],
            parentComponent: "UserProfileView",
            userImageSrc: "",
        };
    },
    async created() {
        const userID = this.$route.params.id;

        await this.storeUser.fetchUser();
        this.user = await this.storeUser.getUserById(userID);
        this.userPosts = await this.storeProfilePost.fetchProfilePost(userID);
        
        this.userImageSrc = await displayImage(this.user.profile_picture_key);
    }
};
</script>
