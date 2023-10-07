<template>
    <div>
        <show-profile
            :parentComponent="parentComponent"
            :userData="currentUserData"
            :profilePictureKey="profilePictureKey"
        />
        <add-profile-post
            :userData="currentUserData"
            :profilePictureKey="profilePictureKey"
        />

        <div
            class="d-flex justify-content-center"
            v-if="currentUserPosts.length === 0"
        >
            <h1 class="mt-5">Nema objava...</h1>
        </div>

        <show-profile-post
            :parentComponent="parentComponent"
            :userData="currentUserData"
            :profilePictureKey="profilePictureKey"
            v-for="post in currentUserPosts"
            :key="post.id"
            :postData="post"
        />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";

import { displayImage } from "@/services/displayImageService";
import eventBus from "@/eventBus";

import showProfile from "@/components/app/showProfile.vue";
import addProfilePost from "@/components/app/addProfilePost.vue";
import showProfilePost from "@/components/app/showProfilePost.vue";

export default {
    name: "MyProfileView",
    components: { showProfile, addProfilePost, showProfilePost },
    data() {
        return {
            currentUserData: {},
            currentUserPosts: [],
            parentComponent: "MyProfileView",
            editingPostID: null,
            profilePictureKey: "",
            storeUser: useStoreUser(),
            storeProfilePost: useStoreProfilePost(),
        };
    },
    async created() {
        await this.storeUser.fetchUser();
        this.currentUserData = await this.storeUser.getCurrentUser();
        this.currentUserPosts = await this.storeProfilePost.fetchProfilePost(this.currentUserData.id);

        this.getEditingPostID();

        this.profilePictureKey = await displayImage(this.currentUserData.profile_picture_key);
    },
    methods: {
        getEditingPostID() {
            eventBus.on("editingPostID", (editingPostID) => {
                if (this.editingPostID !== editingPostID) {
                    const editText = false;
                    eventBus.emit("closeOpenedPostEdit", editText);
                    this.editingPostID = editingPostID;
                }
            });
        },
    },
};
</script>
