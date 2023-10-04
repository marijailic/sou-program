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
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreProfilePost } from "@/stores/profilepost.store";

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
            storeGallery: useStoreGallery(),
            storeProfilePost: useStoreProfilePost(),
            currentUserUsername: localStorage.getItem("username"),
        };
    },
    async created() {
        await this.getCurrentUser();
        await this.getCurrentUserPosts();
        this.getEditingPostID();

        const profilePictureKey = this.currentUserData.profile_picture_key;
        await this.displayImage(profilePictureKey);
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
        getEditingPostID() {
            eventBus.on("editingPostID", (editingPostID) => {
                if (this.editingPostID !== editingPostID) {
                    const editText = false;
                    eventBus.emit("closeOpenedPostEdit", editText);
                    this.editingPostID = editingPostID;
                }
            });
        },
        async displayImage(imageID) {
            const image = await this.storeGallery.googleDisplayImage(imageID);
            this.profilePictureKey = `data:image/jpeg;base64,${image}`;
        },
    },
};
</script>
