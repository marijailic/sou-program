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
        <!-- <button class="btn btn-primary mt-3" @click="openAddUser">
            Dodaj korisnika
        </button> -->
        <add-user v-if="addUser" />
        <search-user />
        <show-user v-for="user in users" :key="user.id" :userData="user" />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import eventBus from "@/eventBus";

import searchUser from "@/components/searchUser.vue";
import showUser from "@/components/showUser.vue";
import addUser from "@/components/addUser.vue";

export default {
    name: "SearchView",
    data() {
        return {
            users: [],
            searchText: "",
            addUser: false,
        };
    },
    components: {
        searchUser,
        showUser,
        addUser,
    },
    setup() {
        const storeUser = useStoreUser();
        return { storeUser };
    },
    created() {
        this.getUsers();
        this.filterUsers();
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
