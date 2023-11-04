<template>
    <div>
        <FormModal
            title="Uredi profilnu objavu"
            :onClose="onClose"
            :onConfirm="updateProfilePost"
            :disabled="!profilePostText"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="profilePostText"
                    class="form-control"
                    rows="9"
                    required
                ></textarea>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useStoreProfilePost } from '@/stores/profilepost.store';

import FormModal from '@/components/app/FormModal.vue';

const props = {
    profilePost: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editProfilePost',
    props,
    components: {
        FormModal,
    },
    data() {
        return {
            profilePostText: this.profilePost.text,
            storeProfilePost: useStoreProfilePost(),
        };
    },
    methods: {
        async updateProfilePost() {
            const updatedProfilePost = {
                id: this.profilePost.id,
                text: this.profilePostText,
            };
            await this.storeProfilePost.updateProfilePost(updatedProfilePost);
        },
    },
};
</script>
