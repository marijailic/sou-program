<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card p-0">
                <div class="align-items-center flex-grow-1 p-3">
                    <textarea
                        v-model.trim="profilePost.text"
                        class="form-control"
                        rows="3"
                        placeholder="Napiši objavu..."
                        required
                    ></textarea>
                </div>
                <div class="card-footer bg-white text-end p-2">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="!profilePost.text"
                    >
                        Objavi
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { useStoreProfilePost } from '@/stores/profilepost.store';

const props = {
    profilePictureSrc: {
        type: String,
        required: true,
    },
};

export default {
    name: 'addProfilePost',
    props,
    data: () => ({
        storeProfilePost: useStoreProfilePost(),
        profilePost: {
            text: '',
        },
    }),
    methods: {
        async postProfilePost() {
            await this.storeProfilePost.createProfilePost(this.profilePost);
        },
    },
};
</script>