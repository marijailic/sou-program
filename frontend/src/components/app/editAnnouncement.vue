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
    data() {
        return {
            storeAnnouncement: useStoreAnnouncement(),
            announcementText: this.announcementData.text,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async updateAnnouncement() {
            const id = this.announcementData.id;
            const text = this.announcementText;

            const updateData = {
                id: id,
                text: text,
            };

            if (text.trim() !== "") {
                await this.storeAnnouncement.updateAnnouncement(updateData);
            }
        }
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
