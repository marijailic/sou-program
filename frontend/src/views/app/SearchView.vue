<template>
    <div>
        <div class="card border-0">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Stalkaonica</h1>
                <button
                    v-if="storeUser.isCurrentUserDemos"
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
                    :closeAddingUser="closeAddingUser"
                    v-if="storeUser.isCurrentUserDemos && isAddingUser"
                />
                <search-user :filterUsers="filterUsers" />
                <show-user
                    v-for="user in users"
                    :key="user.id"
                    :user="user"
                    :getEditingUserID="getEditingUserID"
                    :setEditingUserID="setEditingUserID"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="users.length === 0"
                >
                    <h1 class="mt-5">Nema korisnika...</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'

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
        isAddingUser: false,
        activeEditingUserID: 0,
        storeUser: useStoreUser(),
    }),
    async created() {
        await this.storeUser.fetchUser()
        this.users = this.storeUser.getUsersExceptCurrent()
    },
    methods: {
        openAddingUser() {
            this.isAddingUser = true
        },
        closeAddingUser() {
            this.isAddingUser = false
        },
        filterUsers(searchText) {
            this.users = this.storeUser.getFilteredUsers(searchText)
        },
        getEditingUserID() {
            return this.activeEditingUserID
        },
        setEditingUserID(editingUserID) {
            this.activeEditingUserID = editingUserID
        },
    },
}
</script>
