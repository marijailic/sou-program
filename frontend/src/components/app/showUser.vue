<template>
    <div>
        <div class="card border-0">
            <div class="card-body p-2 d-flex align-items-center gap-3">
                <img
                    class="icon rounded-circle"
                    :src="
                        user.profilePictureSrc ||
                        require('@/assets/sp-icon.png')
                    "
                />
                <div class="flex-grow-1">
                    <router-link
                        :to="'/user-profile/' + user.id"
                        class="text-dark"
                    >
                        {{ user.fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div
                    v-if="isAuthUserDemos"
                    class="d-flex justify-content-end gap-2"
                >
                    <button
                        class="btn btn-primary"
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
import { useStoreUser } from '@/stores/user.store';
import authService from '@/services/authService';

const props = {
    user: {
        type: Object,
        required: true,
    },
    setEditingUserID: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'showUser',
    props,
    computed: {
        isAuthUserDemos() {
            return authService.isAuthUserDemos();
        },
    },
    methods: {
        async deleteUser(userID) {
            const storeUser = useStoreUser();

            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati korisnika?'
            );

            if (isConfirmed) {
                await storeUser.deleteUser(userID);
            }
        },
        openEditingUser(editingUserID) {
            this.setEditingUserID(editingUserID);
        },
        closeEditingUser() {
            this.setEditingUserID(0);
        },
    },
};
</script>
