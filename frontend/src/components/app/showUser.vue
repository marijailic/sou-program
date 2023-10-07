<template>
    <div>
        <div class="card">
            <div class="d-flex align-items-center">
                <img
                    class="user-profile-image rounded-circle"
                    :src="profilePictureKey || '@/assets/sp-icon.png'"
                />
                <div class="flex-grow-1">
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
                <div
                    v-if="isDemos"
                    class="d-flex justify-content-end"
                >
                    <button
                        class="btn btn-primary me-2"
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

import { displayImage } from "@/services/displayImageService";
import eventBus from "@/eventBus";
import userTypeEnum from "@/enums/userTypeEnum";

export default {
    name: "showUser",
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem("type"),
            profilePictureKey: "",
            storeUser: useStoreUser(),
        };
    },
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    async created() {
        this.profilePictureKey = await displayImage(this.userData.profile_picture_key);
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
            const editObj = {
                editUser: true,
                editUserID: this.userData.id,
            };
            eventBus.emit("editUser", editObj);
        }
    },
};
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
    text-align: left;
    color: rgb(33, 37, 41);
}
.username {
    text-align: left;
    font-size: 1rem;
}
</style>
