<template>
    <div>
        <div class="card border-0">
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
        <div class="row">
            <div class="col">
                <add-user
                    v-if="isAuthUserDemos && isAddingUser && isMobile"
                    :closeAddingUser="closeAddingUser"
                />
                <search-user
                    :searchedUsersByUsername="searchedUsersByUsername"
                />
                <show-user
                    v-for="user in users"
                    :key="user.id"
                    :user="user"
                    :getEditingUserID="getEditingUserID"
                    :setEditingUserID="setEditingUserID"
                    :closeAddingUser="closeAddingUser"
                    :isMobile="isMobile"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="users.length === 0"
                >
                    <h1 class="mt-5">Nema korisnika...</h1>
                </div>
            </div>
            <div
                class="col-md-6"
                v-if="
                    isAuthUserDemos &&
                    (isAddingUser || isEditingUser) &&
                    !isMobile
                "
            >
                <add-user
                    v-if="isAuthUserDemos && isAddingUser && !isMobile"
                    :closeAddingUser="closeAddingUser"
                />
                <edit-user
                    v-if="isAuthUserDemos && isEditingUser && !isMobile"
                    :userID="activeEditingUserID"
                    :closeEditingUser="closeEditingUser"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <search-user />
                <show-user
                    v-for="user in users"
                    :key="user.id"
                    :userData="user"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="users.length === 0"
                >
                    <h1 class="mt-5">Nema korisnika...</h1>
                </div>
            </div>
            <div class="col" v-if="addUser || editUser">
                <add-user :closeAdd="closeAdd" v-if="addUser" />
                <edit-user
                    :userID="editUserID"
                    :closeEdit="closeEdit"
                    v-if="editUser"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'

import authService from '@/services/authService'

import searchUser from '@/components/app/searchUser.vue'
import showUser from '@/components/app/showUser.vue'
import addUser from '@/components/app/addUser.vue'

export default {
    name: 'SearchView',
    components: {
        searchUser,
        showUser,
        addUser,
    },
    data: () => ({
        users: [],
        userID: 0,
        isAddingUser: false,
        activeEditingUserID: 0,
        storeUser: useStoreUser(),
        isAuthUserDemos: authService.isAuthUserDemos(),
    }),
    computed: {
        isMobile() {
            return screen.width < 992
        },
        isEditingUser() {
            return this.activeEditingUserID !== 0
        },
    },
    async created() {
        this.users = await this.storeUser.fetchUsers()
        // this.user = this.getUsersExceptCurrent()
        this.searchedUsersByUsername('')
    },
    methods: {
        openAddingUser() {
            this.isAddingUser = true
            this.setEditingUserID(0)
        },
        closeAddingUser() {
            this.isAddingUser = false
        },
        searchedUsersByUsername(searchedUsername) {
            this.users =
                this.storeUser.getSearchedUsersByUsername(searchedUsername)
        },
        getEditingUserID() {
            return this.activeEditingUserID
        },
        setEditingUserID(editingUserID) {
            this.activeEditingUserID = editingUserID
        },
        closeEditingUser() {
            this.setEditingUserID(0)
        },
    },
}
</script>