<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="first-col card-body col-md-1 d-flex justify-content-center"
                >
                    <img
                        v-if="profilePictureKey"
                        class="profile-pic rounded-circle"
                        :src="profilePictureKey"
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
                            {{ postAuthor.name }}
                            {{ postAuthor.surname }}
                        </h5>
                        <span class="text-muted">
                            • {{ formatDate(announcementData.timestamp) }} ago
                        </span>
                        <p class="card-text mt-2">
                            {{ announcementData.text }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="isDemos" class="card-footer text-end">
                <button
                    @click="deleteAnnouncement(announcementData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button
                    class="edit-btn btn btn-primary"
                    @click="openEdit(announcementData.id)"
                >
                    Uredi
                </button>
            </div>
        </div>

        <edit-announcement
            :announcementData="announcementData"
            :closeEdit="closeEdit"
            v-if="editText"
        />
    </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";
import { useStoreUser } from "@/stores/user.store";
import { useStoreGallery } from "@/stores/gallery.store";

import eventBus from "@/eventBus";
import { formatDistanceToNow } from "date-fns";

import editAnnouncement from "./editAnnouncement.vue";
import userTypeEnum from "@/enums/userTypeEnum";

export default {
    name: "showAnnouncement",
    components: {
        editAnnouncement,
    },
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem("type"),
            postAuthor: {},
            closeEdit: () => {},
            editText: false,
            profilePictureKey: "",
        };
    },
    props: {
        announcementData: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const storeAnnouncement = useStoreAnnouncement();
        const storeUser = useStoreUser();
        const storeGallery = useStoreGallery();

        const authorID = props.announcementData.author_id;

        return { storeAnnouncement, storeUser, storeGallery, authorID };
    },
    async created() {
        await this.getPostAuthor();
        this.closeEdit = () => {
            this.editText = false;
        };

        const profilePictureKey = this.postAuthor.profile_picture_key;
        await this.displayImage(profilePictureKey);
    },
    methods: {
        async getPostAuthor() {
            await this.storeUser.fetchUser();
            const postAuthor = await this.storeUser.getUserById(this.authorID);
            this.postAuthor = postAuthor;
        },
        formatDate(strDate) {
            const objDate = new Date(strDate);
            const timeAgo = formatDistanceToNow(objDate);
            return timeAgo;
        },
        async deleteAnnouncement(idObjava) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati objavu?"
            );

            if (isConfirmed) {
                await this.storeAnnouncement.deleteAnnouncement(idObjava);
            }
        },
        openedEditCheck() {
            eventBus.on("closeOpenedAnnouncementEdit", (editText) => {
                this.editText = editText;
            });
        },
        openEdit(editingAnnouncementID) {
            this.openedEditCheck();
            eventBus.emit("editingAnnouncementID", editingAnnouncementID);
            this.editText = true;
        },
        async displayImage(imageID) {
            const image = await this.storeGallery.googleDisplayImage(imageID);
            this.profilePictureKey = `data:image/jpeg;base64,${image}`;
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
