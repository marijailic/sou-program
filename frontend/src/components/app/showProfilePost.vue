<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="first-col card-body col-md-1 d-flex justify-content-center"
                >
                    <img
                        v-if="profilePictureKey || userProfilePictureKey"
                        class="profile-pic rounded-circle"
                        :src="
                            parentComponent === 'MyProfileView'
                                ? profilePictureKey
                                : userProfilePictureKey
                        "
                    />
                    <img
                        v-else
                        class="profile-pic rounded-circle"
                        src="@/assets/sp-icon.png"
                    />
                </div>
                <div
                    class="second-col col-md-11 d-flex align-items-center text-start"
                >
                    <div class="card-right card-body text-start">
                        <h5 class="card-title d-inline m-0">
                            {{ userData.name }}
                            {{ userData.surname }}
                        </h5>
                        <span class="text-muted">
                            • {{ formatDate(postData.timestamp) }} ago
                        </span>
                        <p class="card-text mt-2">{{ postData.text }}</p>
                    </div>
                </div>
            </div>

            <div
                class="card-footer text-end"
                v-if="parentComponent === 'MyProfileView'"
            >
                <button
                    @click="deleteProfilePost(postData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button
                    class="edit-btn btn btn-primary"
                    @click="openEdit(postData.id)"
                >
                    Uredi
                </button>
            </div>
        </div>

        <edit-profile-post
            :postData="postData"
            :closeEdit="closeEdit"
            v-if="editText"
        />
    </div>
</template>

<script>
import { useStoreProfilePost } from "@/stores/profilepost.store";

import eventBus from "@/eventBus";
import { formatDistanceToNow } from "date-fns";

import editProfilePost from "./editProfilePost.vue";

export default {
    name: "showProfilePost",
    components: {
        editProfilePost,
    },
    data() {
        return {
            storeProfilePost: useStoreProfilePost(),
            closeEdit: () => {},
            editText: false,
        };
    },
    props: {
        userData: {
            type: Object,
            required: true,
        },
        postData: {
            type: Object,
            required: true,
        },
        parentComponent: {
            type: String,
            required: true,
        },
        profilePictureKey: {
            type: String,
            required: false,
        },
        userProfilePictureKey: {
            type: String,
            required: false,
        },
    },
    created() {
        this.closeEdit = () => {
            this.editText = false;
        };
    },
    methods: {
        formatDate(strDate) {
            const objDate = new Date(strDate);
            const timeAgo = formatDistanceToNow(objDate);
            return timeAgo;
        },
        async deleteProfilePost(idPost) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati objavu?"
            );

            if (isConfirmed) {
                await this.storeProfilePost.deleteProfilePost(idPost);
            }
        },
        openedEditCheck() {
            eventBus.on("closeOpenedPostEdit", (editText) => {
                this.editText = editText;
            });
        },
        openEdit(editingPostID) {
            this.openedEditCheck();
            eventBus.emit("editingPostID", editingPostID);
            this.editText = true;
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
.delete-btn {
    margin-right: 1vw;
}
</style>
