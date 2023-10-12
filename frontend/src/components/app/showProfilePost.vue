<template>
    <div>
        <div class="card">
            <div class="d-flex justify-content-center gap-3">
                <img
                    class="profile-pic rounded-circle"
                    :src="user.imageSrc || require('@/assets/sp-icon.png')"
                />
                <div class="flex-grow-1 d-flex align-items-center text-start">
                    <div class="text-start">
                        <h6 class="d-inline m-0">
                            {{ userFullName }}
                        </h6>
                        <span class="text-muted">
                            •
                            {{ profilePost.posted_at }} ago
                        </span>
                        <p class="card-text mt-2">{{ profilePost.text }}</p>
                    </div>
                </div>
            </div>

            <div class="card-footer text-end" v-if="canEdit">
                <button
                    @click="deleteProfilePost(profilePost.id)"
                    class="btn btn-primary me-2"
                >
                    Izbriši
                </button>
                <button
                    class="btn btn-primary"
                    @click="openEditing(profilePost.id)"
                >
                    Uredi
                </button>
            </div>
        </div>

        <edit-profile-post
            :profilePost="profilePost"
            :closeEditing="closeEditing"
            v-if="canEdit && isEditingActive"
        />
    </div>
</template>

<script>
import { useStoreProfilePost } from '@/stores/profilepost.store'

import editProfilePost from './editProfilePost.vue'

const props = {
    user: {
        type: Object,
        required: true,
    },
    profilePost: {
        type: Object,
        required: true,
    },
    setEditingProfilePostID: {
        type: Function,
        required: false,
        default: null,
    },
    getEditingProfilePostID: {
        type: Function,
        required: false,
        default: null,
    },
}

export default {
    name: 'showProfilePost',
    props,
    components: {
        editProfilePost,
    },
    data: () => ({
        storeProfilePost: useStoreProfilePost(),
        isEditingActive: false,
        canEdit: false,
    }),
    async created() {
        this.canEdit =
            this.setEditingProfilePostID && this.getEditingProfilePostID
    },
    computed: {
        isEditingActive() {
            return (
                this.getEditingProfilePostID !== null &&
                this.profilePost.id === this.getEditingProfilePostID()
            )
        },
        userFullName() {
            return `${this.user.name} ${this.user.surname}`
        },
    },
    methods: {
        async deleteProfilePost(profilePostID) {
            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati objavu?'
            )

            if (isConfirmed) {
                await this.storeProfilePost.deleteProfilePost(profilePostID)
            }
        },
        openEditing(editingProfilePostID) {
            this.setEditingProfilePostID(editingProfilePostID)
        },
        closeEditing() {
            this.setEditingProfilePostID(0)
        },
    },
}
</script>

<style scoped>
.card {
    border: none;
    margin-top: 1em;
}
.row {
    padding: 1em;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7em;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
