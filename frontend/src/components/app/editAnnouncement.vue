<template>
    <div>
        <form @submit.prevent="updateAnnouncement">
            <div class="card border-0 p-0 mt-2">
                <div class="card-body text-start">
                    <textarea
                        v-model="announcementData.text"
                        class="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="() => {this.closeEdit()}">
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

const props = {
    announcementData: {
        type: Object,
        required: true,
    },
    closeEdit: {
        type: Function,
        required: true,
    },
}

export default {
    name: "editAnnouncement",
    props,
    data: () => ({
        storeAnnouncement: useStoreAnnouncement(),
    }),
    methods: {
        async updateAnnouncement() {
            const updateData = {
                id: this.announcementData.id,
                text: this.announcementData.text.trim(),
            };

            if (updateData.text !== "") {
                await this.storeAnnouncement.updateAnnouncement(updateData);
            }
        }
    },
};
</script>

<style scoped>
.card {
    background-color: #eaeaea;
}
.card-footer {
    background-color: #eaeaea;
}
</style>
