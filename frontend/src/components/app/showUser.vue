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
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'
import authService from '@/services/authService'

const props = {
    user: {
        type: Object,
        required: true,
    },
    setEditingUserID: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'showUser',
    props,
    computed: {
        isAuthUserDemos() {
            return authService.isAuthUserDemos()
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
            this.setEditingUserID(editingUserID)
        },
        closeEditingUser() {
            this.setEditingUserID(0)
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
