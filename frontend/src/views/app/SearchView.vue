<template>
    <div>
        <div class="card border-0">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Stalkaonica</h1>
                <button
                    v-if="isDemos"
                    class="btn btn-primary"
                    @click="openAddUser"
                >
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
import { useStoreUser } from "@/stores/user.store";
import eventBus from "@/eventBus";

import searchUser from "@/components/app/searchUser.vue";
import showUser from "@/components/app/showUser.vue";
import addUser from "@/components/app/addUser.vue";
import editUser from "@/components/app/editUser.vue";

import userTypeEnum from "@/enums/userTypeEnum";

export default {
    name: "SearchView",
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem("type"),
            users: [],
            searchText: "",
            storeUser: useStoreUser(),
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
    created() {
        this.getUsers();
        this.filterUsers();
        this.openEditUser();
    },
    methods: {
        closeAdd() {
            this.addUser = false;
        },
        closeEdit() {
            this.editUser = false;
        },
        async getUsers() {
            await this.storeUser.fetchUser();
            this.users = this.storeUser.getUsersExceptCurrent();
        },
        filterUsers() {
            eventBus.on("searchText", (searchText) => {
                this.searchText = searchText;
                this.users = this.storeUser.getFilteredUsers(searchText);
            });
        },
        rightColActiveCheck() {
            this.addUser = false;
            this.editUser = false;
        },
        openAddUser() {
            this.rightColActiveCheck();
            this.addUser = true;
        },
        openEditUser() {
            eventBus.on("editUser", (editObj) => {
                this.rightColActiveCheck();
                this.editUserID = editObj.editUserID;
                this.$nextTick(() => {
                    this.editUser = editObj.editUser;
                });
            });
        },
    },
};
</script>
