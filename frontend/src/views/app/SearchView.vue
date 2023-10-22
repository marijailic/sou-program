<template>
    <div>
        <div class="card">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Stalkaonica</h1>
                <button
                    v-if="isAuthUserDemos"
                    class="btn btn-primary"
                    @click="openAddingUser"
                >
                    Dodaj korisnika
                </button>
            </div>
        </div>
        <div>
            <search-user :searchedUsersByUsername="searchedUsersByUsername" />
            <show-user
                v-for="user in users"
                :key="user.id"
                :user="user"
                :setEditingUserID="setEditingUserID"
            />
            <div
                class="d-flex justify-content-center"
                v-if="users.length === 0"
            >
                <h1 class="mt-5">Nema korisnika...</h1>
            </div>
        </div>
        <add-user
            v-if="isAuthUserDemos && isAddingUser"
            :closeAddingUser="closeAddingUser"
        />
        <edit-user
            v-if="isAuthUserDemos && isEditingUser"
            :userID="activeEditingUserID"
            :closeEditingUser="closeEditingUser"
        />
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';

import authService from '@/services/authService';

import searchUser from '@/components/app/searchUser.vue';
import showUser from '@/components/app/showUser.vue';
import addUser from '@/components/app/addUser.vue';
import editUser from '@/components/app/editUser.vue';

export default {
    name: 'SearchView',
    components: {
        searchUser,
        showUser,
        addUser,
        editUser,
    },
    data: () => ({
        users: [],
        isAddingUser: false,
        activeEditingUserID: 0,
        storeUser: useStoreUser(),
        isAuthUserDemos: authService.isAuthUserDemos(),
    }),
    computed: {
        isEditingUser() {
            return this.activeEditingUserID !== 0;
        },
    },
    async created() {
        this.users = await this.storeUser.fetchUsers();
        this.searchedUsersByUsername('');
    },
    methods: {
        openAddingUser() {
            this.isAddingUser = true;
        },
        closeAddingUser() {
            this.isAddingUser = false;
        },
        searchedUsersByUsername(searchedUsername) {
            this.users =
                this.storeUser.getSearchedUsersByUsername(searchedUsername);
        },
        setEditingUserID(editingUserID) {
            this.activeEditingUserID = editingUserID;
        },
        closeEditingUser() {
            this.setEditingUserID(0);
        },
    },
};
</script>