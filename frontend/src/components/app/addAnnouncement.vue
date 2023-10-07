<template>
    <div>
        <form @submit.prevent="postAnnouncement" class="card border-0 p-0 mt-3">
            <div class="d-flex gap-3 p-3">
                <div>
                    <img
                        class="profile-pic rounded-circle"
                        :src="profilePictureKey || '@/assets/sp-icon.png'"
                    />
                </div>
                <div class="flex-grow-1">
                    <textarea
                        v-model="announcementText"
                        class="form-control"
                        rows="3"
                        placeholder="Napiši obavijest..."
                        required
                    ></textarea>
                </div>
            </div>
            <div class="card-footer bg-white text-end">
                <button type="submit" class="btn btn-primary">
                    Objavi
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";

export default {
    name: "addAnnouncement",
    props: {
        userData: {
            type: Object,
            required: true,
        },
        profilePictureKey: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            storeAnnouncements: useStoreAnnouncement(),
            announcementText: "",
        };
    },
    methods: {
        async postAnnouncement() {
            const announcementData = {
                text: this.announcementText,
                authorId: this.userData.id,
            };

            if (this.announcementText.trim() !== "") {
                await this.storeAnnouncement.createAnnouncement(announcementData);
            }
        }
    },
};
</script>

<style scoped>
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
