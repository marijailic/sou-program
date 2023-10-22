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
import { useStoreUser } from '@/stores/user.store';
import { useStoreProfilePost } from '@/stores/profilepost.store';

import showProfile from '@/components/app/showProfile.vue';
import showProfilePost from '@/components/app/showProfilePost.vue';

export default {
    name: 'UserProfileView',
    components: { showProfile, showProfilePost },
    data: () => ({
        userID: 0,
        user: {},
        profilePosts: [],
    }),
    async created() {
        const storeProfilePost = useStoreProfilePost();
        const storeUser = useStoreUser();

        await storeUser.fetchUsers();

        this.userID = this.$route.params.id;
        this.user = storeUser.getUserByID(this.userID);

        this.profilePosts = await storeProfilePost.fetchProfilePosts(
            this.userID
        );
    },
};
</script>