<template>
    <div>
        <form @submit.prevent="postAnnouncement">
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
                        class="ps-0 col-md-11 d-flex align-items-center text-start"
                    >
                        <div class="ps-0 card-body text-start">
                            <textarea
                                v-model="announcementText"
                                class="form-control"
                                rows="3"
                                placeholder="Napiši obavijest..."
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white text-end">
                    <button type="submit" class="btn btn-primary">
                        Objavi
                    </button>
                </div>
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
            const text = this.announcementText;

            const announcementData = {
                text: this.announcementText,
                authorId: this.userData.id,
            };

            if (text.trim() !== "") {
                await this.storeAnnouncement.createAnnouncement(announcementData);
            }
        }
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
.card-footer {
    padding: 0.7vw;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
