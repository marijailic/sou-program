<template>
    <div>
        <show-profile :user="user" />
        <div
            class="d-flex justify-content-center"
            v-if="profilePosts.length === 0"
        >
            <h1 class="mt-5">Nema objava...</h1>
        </div>

        <show-profile-post
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="user"
            :profilePost="profilePost"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'
import { useStoreProfilePost } from '@/stores/profilepost.store'

import showProfile from '@/components/app/showProfile.vue'
import showProfilePost from '@/components/app/showProfilePost.vue'

export default {
    name: 'UserProfileView',
    components: { showProfile, showProfilePost },
    data: () => ({
        user: {},
        profilePosts: [],
        storeProfilePost: useStoreProfilePost(),
    }),
    async created() {
        const storeUser = useStoreUser()
        const userID = this.$route.params.id

        await storeUser.fetchUser()

        this.user = await storeUser.getUserByID(userID)

        this.user.profilePosts = await this.storeProfilePost.fetchProfilePost(
            userID
        )

        this.user.imageSrc = await this.user.getProfilePictureSrc()
    },
}
</script>