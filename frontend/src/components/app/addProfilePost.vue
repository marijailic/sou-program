<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card">
                <div class="row">
                    <div
                        class="first-col card-body col-md-1 d-flex justify-content-center"
                    >
                        <img
                            v-if="profilePictureKey"
                            class="profile-pic rounded-circle"
                            :src="profilePictureKey"
                        />
                        <img
                            v-else
                            class="profile-pic rounded-circle"
                            src="@/assets/sp-icon.png"
                        />
                    </div>
                    <div
                        class="second-col col-md-11 d-flex align-items-center text-start"
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
            const text = this.postText;
            const authorId = this.userData.id;

            const profilePostData = {
                text: text,
                authorId: authorId,
            };

            if (text.trim() !== "") {
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
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
