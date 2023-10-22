<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditing"
            :onConfirm="updateAnnouncement"
            title="Uredi oglas"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="announcement.text"
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
            storeAnnouncement: useStoreAnnouncement(),
        };
    },
    methods: {
        async updateAnnouncement() {
            await this.storeAnnouncement.updateAnnouncement(this.announcement);
        },
    },
};
</script>

<style scoped>
</style>
