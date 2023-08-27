<template>
    <div class="edit-announcement">
        <form @submit.prevent="updateAnnouncement">
            <div class="d-flex align-items-center">
                <img
                    src="@/assets/sp-icon.png"
                    class="user-profile-image rounded-circle"
                />
                <textarea
                    v-model="announcementText"
                    class="form-control"
                    rows="3"
                    required
                ></textarea>
            </div>
            <div class="d-flex justify-content-end">
                <a class="escape-btn btn btn-primary" @click="closeEdit">
                    Odustani
                </a>
                <button type="submit" class="post-btn btn btn-primary">
                    Uredi
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";
import { ref } from "vue";

export default {
    name: "editAnnouncement",
    props: {
        announcementData: {
            type: Object,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const storeAnnouncement = useStoreAnnouncement();

        const announcementText = ref(props.announcementData.text);

        const updateAnnouncement = async () => {
            const id = props.announcementData.id;
            const text = announcementText.value;

            const updateData = {
                id: id,
                text: text,
            };

            if (text.trim() !== "") {
                await storeAnnouncement.updateAnnouncement(updateData);
            }
        };

        return {
            storeAnnouncement,
            updateAnnouncement,
            announcementText,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
    },
};
</script>

<style scoped>
.edit-announcement {
    padding-right: 2vw;
    padding-left: 2vw;
    padding-bottom: 2vw;
}
.user-profile-image {
    width: 40px;
    height: 40px;
    margin-right: 1vw;
}
.escape-btn {
    margin-top: 1vw;
    margin-right: 1vw;
}
.post-btn {
    margin-top: 1vw;
}
</style>
