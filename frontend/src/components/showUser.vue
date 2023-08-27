<template>
    <div class="container show-user">
        <div class="user-profile">
            <img
                src="@/assets/sp-icon.png"
                class="user-profile-image rounded-circle"
            />
            <div class="user-info">
                <div class="user-name">
                    {{ userData.name }} {{ userData.surname }}
                </div>
                <div class="username">{{ userData.username }}</div>
            </div>
            <div class="user-actions d-flex justify-content-end">
                <button
                    class="delete-btn btn btn-primary"
                    @click="deleteUser(userData.id)"
                >
                    Izbriši
                </button>
                <button class="edit-btn btn btn-primary" @click="openEditUser">
                    Uredi
                </button>
            </div>
        </div>
        <edit-user :userData="userData" v-if="editUser" />
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import editUser from "@/components/editUser.vue";

export default {
    name: "showUser",
    data() {
        return { editUser: false };
    },
    components: { editUser },
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
                const response = await this.storeUser.deleteUser(idUser);
                if (response && response.success) {
                    alert(response.message);
                }
            }
        },
        openEditUser() {
            this.editUser = true;
        },
    },
};
</script>

<style scoped>
.show-user {
    margin-top: 2vw;
}
.user-profile {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
}
.user-profile-image {
    width: 40px;
    height: 40px;
    margin-right: 1vw;
}
.user-name {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}

.username {
    text-align: left;
    font-size: 14px;
    color: #888;
}
.user-info {
    width: 100%;
}
.user-actions {
    width: 100%;
}

.delete-btn {
    margin-right: 1vw;
}
</style>
