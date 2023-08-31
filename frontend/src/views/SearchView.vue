<template>
    <div>
        <div class="card">
            <div class="header">
                <h1>Stalkaonica</h1>
                <button class="btn btn-primary" @click="openAddUser">
                    Dodaj korisnika
                </button>
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
            </div>
            <div class="col" v-if="addUser || editUser">
                <add-user v-if="addUser" />
                <edit-user :userID="editUserID" v-if="editUser" />
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import eventBus from "@/eventBus";

import searchUser from "@/components/searchUser.vue";
import showUser from "@/components/showUser.vue";
import addUser from "@/components/addUser.vue";
import editUser from "@/components/editUser.vue";

export default {
    name: "SearchView",
    data() {
        return {
            users: [],
            searchText: "",
            addUser: false,
            editUser: false,
            editUserID: null,
        };
    },
    components: {
        searchUser,
        showUser,
        addUser,
        editUser,
    },
    setup() {
        const storeUser = useStoreUser();
        return { storeUser };
    },
    created() {
        this.getUsers();
        this.filterUsers();
        this.openEditUser();
    },
    methods: {
        async getUsers() {
            const users = await this.storeUser.fetchUser();
            this.users = users;
        },
        filterUsers() {
            eventBus.on("searchText", (searchText) => {
                this.searchText = searchText;

                this.users = this.storeUser.getFilteredUsers(searchText);
            });
        },
        openAddUser() {
            this.addUser = true;
        },
        openEditUser() {
            eventBus.on("editUser", (editObj) => {
                this.editUser = editObj.editUser;
                this.editUserID = editObj.editUserID;
            });
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
