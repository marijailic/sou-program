<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditing"
            :onConfirm="updateAnnouncement"
            title="Uredi oglas"
            :disabled="!announcementText"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="announcementText"
                    class="form-control"
                    rows="3"
                    required
                ></textarea>
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { useStoreAnnouncement } from '@/stores/announcement.store';

import ModalForm from '@/components/app/ModalForm.vue';

const props = {
    announcement: {
        type: Object,
        required: true,
    },
    closeEditing: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editAnnouncement',
    props,
    components: {
        ModalForm,
    },
    data() {
        return {
            announcementText: this.announcement.text,
            storeAnnouncement: useStoreAnnouncement(),
        };
    },
    methods: {
        async updateAnnouncement() {
            const updatedAnnouncement = {
                id: this.announcement.id,
                text: this.announcementText,
            };
            await this.storeAnnouncement.updateAnnouncement(
                updatedAnnouncement
            );
        },
    },
};
</script>

<style scoped>
</style>
