<template>
    <div>
        <show-profile :user="currentUser" />
        <add-profile-post :profilePictureSrc="currentUser.profilePictureSrc" />

        <div
            class="d-flex justify-content-center"
            v-if="profilePosts.length === 0"
        >
            <h1 class="mt-5">Nema objava...</h1>
        </div>

        <show-profile-post
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="currentUser"
            :profilePost="profilePost"
            :setEditingProfilePostID="setEditingProfilePostID"
            :getEditingProfilePostID="getEditingProfilePostID"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'
import { useStoreProfilePost } from '@/stores/profilepost.store'

import authService from '@/services/authService'

import showProfile from '@/components/app/showProfile.vue'
import addProfilePost from '@/components/app/addProfilePost.vue'
import showProfilePost from '@/components/app/showProfilePost.vue'

export default {
    name: 'MyProfileView',
    components: { showProfile, addProfilePost, showProfilePost },
    data: () => ({
        currentUser: {},
        profilePosts: [],
        activeEditingProfilePostID: 0,
        storeUser: useStoreUser(),
        storeProfilePost: useStoreProfilePost(),
    }),
    async created() {
        await this.storeUser.fetchUsers()
        this.currentUser = await this.storeUser.getUserByUsername(
            authService.getAuthUsername()
        )

        this.profilePosts = await this.storeProfilePost.fetchProfilePosts(
            this.currentUser.id
        )
    },
    methods: {
        getEditingProfilePostID() {
            return this.activeEditingProfilePostID
        },
        setEditingProfilePostID(editingProfilePostID) {
            this.activeEditingProfilePostID = editingProfilePostID
        },
    },
}
</script>
