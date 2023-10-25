<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditing"
            :onConfirm="updateProfilePost"
            title="Uredi profilnu objavu"
            :disabled="!profilePostText"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="profilePostText"
                    class="form-control"
                    rows="3"
                    required
                ></textarea>
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { useStoreProfilePost } from '@/stores/profilepost.store';

import ModalForm from '@/components/app/ModalForm.vue';

const props = {
    profilePost: {
        type: Object,
        required: true,
    },
    closeEditing: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editProfilePost',
    props,
    components: {
        ModalForm,
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
