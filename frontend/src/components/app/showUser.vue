<template>
    <div>
        <div class="card">
            <div class="d-flex align-items-center">
                <img
                    class="user-profile-image rounded-circle"
                    :src="userImageSrc"
                />
                <div class="flex-grow-1">
                    <router-link
                        :to="'/user-profile/' + user.id"
                        class="user-name"
                    >
                        {{ fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div v-if="isDemos" class="d-flex justify-content-end">
                    <button
                        class="btn btn-primary me-2"
                        @click="deleteUser(user.id)"
                    >
                        Izbriši
                    </button>
                    <button
                        class="edit-btn btn btn-primary"
                        @click="openEditing(user.id)"
                    >
                        Uredi
                    </button>
                </div>
            </div>
        </div>
        <edit-user
            v-if="isDemos && isEditingActive && user"
            :user="user"
            :closeEditing="closeEditing"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'
import userTypeEnum from '@/enums/userTypeEnum'

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
}

export default {
    name: 'showUser',
    props,
    components: { editUser },
    data: () => ({
        isDemos: userTypeEnum.DEMOS === localStorage.getItem('type'),
        userImageSrc: require('@/assets/sp-icon.png'),
        storeUser: useStoreUser(),
        isEditingUser: false,
    }),
    async created() {
        this.userImageSrc = await this.user.getProfilePictureSrc()
    },
    computed: {
        fullName() {
            return `${this.user.name} ${this.user.surname}`
        },
        isEditingActive() {
            return this.user.id === this.getEditingUserID()
        },
    },
    methods: {
        async deleteUser(userID) {
            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati korisnika?'
            )

            if (isConfirmed) {
                await this.storeUser.deleteUser(userID)
            }
        },
        openEditing(editingUserID) {
            this.setEditingUserID(editingUserID)
        },
        closeEditing() {
            this.setEditingUserID(0)
        },
    },
}
</script>

<style scoped>
.card {
    border: none;
    padding: 0.5rem;
    margin-top: 1rem;
}
.user-profile-image {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
}
.user-name {
    color: #212529;
}
</style>
