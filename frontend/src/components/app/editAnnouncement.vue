<template>
    <div>
        <form @submit.prevent="updateAnnouncement">
            <div class="card border-0 p-0 mt-2">
                <div class="card-body text-start">
                    <textarea
                        v-model.trim="announcementText"
                        class="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="closeEditing">
                        Odustani
                    </a>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="
                            announcementText === announcement.text ||
                            !announcementText
                        "
                    >
                        Spremi promjenu
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreAnnouncement } from '@/stores/announcement.store'

const props = {
    announcement: {
        type: Object,
        required: true,
    },
    closeEditing: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'editAnnouncement',
    props,
    data() {
        return {
            announcementText: this.announcement.text,
            storeAnnouncement: useStoreAnnouncement(),
        }
    },
    methods: {
        async updateAnnouncement() {
            const updatedAnnouncement = {
                id: this.announcement.id,
                text: announcementText,
            }

            await this.storeAnnouncement.updateAnnouncement(updatedAnnouncement)
        },
    },
}
</script>

<style scoped>
.card,
.card-footer {
    background-color: var(--white-color-2);
}
</style>
