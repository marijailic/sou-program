<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card">
                <div class="d-flex">
                        <img
                            class="card-img-top rounded-circle mx-sm-auto mx-2"
                            :src="profilePictureKey || '@/assets/sp-icon.png'"
                        />
                    <div
                        class="align-items-center text-start"
                    >
                        <div class="card-right card-body text-start">
                            <textarea
                                v-model="postText"
                                class="form-control"
                                rows="3"
                                placeholder="Napiši objavu..."
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-primary">
                        Objavi
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { useStoreProfilePost } from "@/stores/profilepost.store";

export default {
    name: "addProfilePost",
    props: {
        userData: {
            type: Object,
            required: true,
        },
        profilePictureKey: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            storeProfilePost: useStoreProfilePost(),
            postText: "",
        };
    },
    methods: {
        async postProfilePost() {
            const profilePostData = {
                text: this.postText,
                authorId: this.userData.id,
            };

            if (this.postText.trim() !== "") {
                await this.storeProfilePost.createProfilePost(profilePostData);
            }
        }
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1rem;
}
.row {
    padding: 1rem;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7rem;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
