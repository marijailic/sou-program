<template>
    <div>
        <form @submit.prevent="postAnnouncement">
            <div class="card">
                <div class="row">
                    <div
                        class="first-col card-body col-md-1 d-flex justify-content-center"
                    >
                        <img
                            src="@/assets/sp-icon.png"
                            class="profile-pic rounded-circle"
                        />
                    </div>
                    <div
                        class="second-col col-md-11 d-flex align-items-center text-start"
                    >
                        <div class="card-right card-body text-start">
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
                <div class="card-footer text-end">
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
import { ref } from "vue";

export default {
    name: "addAnnouncement",
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const storeAnnouncement = useStoreAnnouncement();

        const announcementText = ref("");

        const postAnnouncement = async () => {
            const text = announcementText.value;
            const authorId = props.userData.id;

            const announcementData = {
                text: text,
                authorId: authorId,
            };

            if (text.trim() !== "") {
                await storeAnnouncement.createAnnouncement(announcementData);
            }
        };

        return {
            storeAnnouncement,
            postAnnouncement,
            announcementText,
        };
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
</style>
