<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditing"
            :onConfirm="updateProfilePost"
            title="Uredi profilnu objavu"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="profilePost.text"
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
            storeProfilePost: useStoreProfilePost(),
        };
    },
    methods: {
        async updateProfilePost() {
            await this.storeProfilePost.updateProfilePost(this.profilePost);
        },
    },
};
</script>

<style scoped>
.card,
.card-footer {
    background-color: var(--white-color-2);
}
.card {
    border: none;
    padding: 0;
    margin-top: 1em;
}
.card-footer {
    padding: 0.7em;
}
.escape-btn {
    margin-right: 1em;
}
</style>
