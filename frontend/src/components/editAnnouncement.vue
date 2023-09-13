<template>
    <div>
        <form @submit.prevent="updateAnnouncement">
            <div class="card">
                <div class="row">
                    <div class="card-body text-start">
                        <textarea
                            v-model="announcementText"
                            class="form-control"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeEdit">
                        Odustani
                    </a>
                    <button type="submit" class="btn btn-primary">
                        Spremi promjenu
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
.card {
    border: none;
    padding: 0;
    background-color: #eaeaea;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: #eaeaea;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
