<template>
    <div>
        <div class="card">
            <div class="d-flex align-items-center">
                <img
                    class="user-profile-image rounded-circle"
                    :src="
                        user.profilePictureSrc ||
                        require('@/assets/sp-icon.png')
                    "
                />
                <div class="flex-grow-1">
                    <router-link
                        :to="'/user-profile/' + user.id"
                        class="user-name"
                    >
                        {{ user.fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div v-if="isAuthUserDemos" class="d-flex justify-content-end">
                    <button
                        class="btn btn-primary me-2"
                        @click="deleteUser(user.id)"
                    >
                        Izbriši
                    </button>
                    <button
                        class="edit-btn btn btn-primary"
                        @click="openEditingUser(user.id)"
                    >
                        Uredi
                    </button>
                </div>
            </div>
        </div>
        <edit-user
            v-if="isAuthUserDemos && isEditingActive && !isMobile"
            :userID="user.id"
            :closeEditingUser="closeEditingUser"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'

import editUser from '@/components/app/editUser.vue'

const props = {
    user: {
        type: Object,
        required: true,
    },
    getEditingUserID: {
        type: Function,
        required: true,
    },
    setEditingUserID: {
        type: Function,
        required: true,
    },
    closeAddingUser: {
        type: Function,
        required: true,
    },
    isMobile: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'showUser',
    props,
    components: { editUser },
    computed: {
        isEditingActive() {
            return this.user.id === this.getEditingUserID()
        },
    },
    methods: {
        async deleteUser(userID) {
            const storeUser = useStoreUser()

            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati korisnika?'
            )

            if (isConfirmed) {
                await storeUser.deleteUser(userID)
            }
        },
        openEditingUser(editingUserID) {
            this.closeAddingUser()
            this.setEditingUserID(editingUserID)
        },
        closeEditingUser() {
            this.setEditingUserID(0)
        },
        isAuthUserDemos() {
            return authService.isAuthUserDemos()
        },
    },
}
</script>

<style scoped>
div,
button {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.card {
    border: none;
    padding: 0.5rem;
    margin-top: 1rem;
}
.user-profile-image {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    margin-right: 1rem;
}
.user-name {
    color: var(--black-color);
}
</style>
