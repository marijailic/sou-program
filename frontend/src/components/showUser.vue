<template>
    <div>
        <div class="card">
            <div class="user-profile">
                <img
                    src="@/assets/sp-icon.png"
                    class="user-profile-image rounded-circle"
                />
                <div class="user-info">
                    <router-link
                        :to="'/user-profile/' + userData.id"
                        class="user-name"
                    >
                        {{ userData.name }} {{ userData.surname }}
                    </router-link>
                    <div class="username text-muted">
                        {{ userData.username }}
                    </div>
                </div>
                <div class="user-actions d-flex justify-content-end">
                    <button
                        class="delete-btn btn btn-primary"
                        @click="deleteUser(userData.id)"
                    >
                        Izbriši
                    </button>
                    <button
                        class="edit-btn btn btn-primary"
                        @click="openEditUser"
                    >
                        Uredi
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import eventBus from "@/eventBus";

export default {
    name: "showUser",
    data() {
        return {};
    },
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const storeUser = useStoreUser();
        return { storeUser };
    },
    methods: {
        async deleteUser(idUser) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati korisnika?"
            );

            if (isConfirmed) {
                await this.storeUser.deleteUser(idUser);
            }
        },
        openEditUser() {
            const editUser = true;
            const editUserID = this.userData.id;
            const editObj = {
                editUser,
                editUserID,
            };
            eventBus.emit("editUser", editObj);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
    margin-top: 1vw;
}
.user-profile {
    display: flex;
    align-items: center;
}
.user-profile-image {
    width: 50px;
    height: 50px;
    margin-right: 1vw;
}
.user-info {
    width: 100%;
}
.user-name {
    text-align: left;
    color: rgb(33, 37, 41);
}
.username {
    text-align: left;
    font-size: 14px;
}
.user-actions {
    width: 100%;
}
.delete-btn {
    margin-right: 1vw;
}
</style>
