<template>
    <div>
        <form @submit.prevent="updateProfilePost">
            <div class="card">
                <div class="card-body text-start">
                    <textarea
                        v-model.trim="profilePostText"
                        class="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeEditing">
                        Odustani
                    </a>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="
                            profilePostText === profilePost.text ||
                            !profilePostText
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
import { useStoreProfilePost } from '@/stores/profilepost.store'

const props = {
    profilePost: {
        type: Object,
        required: true,
    },
    closeEditing: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'editProfilePost',
    props,
    data() {
        return {
            profilePostText: this.profilePost.text,
            storeProfilePost: useStoreProfilePost(),
        }
    },
    methods: {
        async updateProfilePost() {
            this.profilePost.text = profilePostText

            await this.storeProfilePost.updateProfilePost(this.profilePost)
        },
    },
}
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
