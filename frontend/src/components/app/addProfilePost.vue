<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card">
                <div class="d-flex">
                    <img
                        class="profile-pic card-img-top mt-3 rounded-circle mx-2"
                        :src="user.imageSrc || require('@/assets/sp-icon.png')"
                    />
                    <div class="align-items-center text-start flex-grow-1">
                        <!-- <div class="card-right card-body text-start"> -->
                        <textarea
                            v-model.trim="profilePost.text"
                            class="form-control"
                            rows="3"
                            placeholder="Napiši objavu..."
                            required
                        ></textarea>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="card-footer text-end">
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
import { useStoreProfilePost } from '@/stores/profilepost.store'

const props = {
    user: {
        type: Object,
        required: true,
    },
}

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
            await this.storeProfilePost.createProfilePost(this.profilePost)
        },
    },
}
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1rem;
}
/* .row {
    padding: 1rem;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
} */
.card-footer {
    padding: 0.7rem;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
