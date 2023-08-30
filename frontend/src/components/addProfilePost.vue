<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card">
                <div class="row">
                    <div
                        class="first-col card-body col-md-1 d-flex justify-content-center"
                    >
                        <img
                            src="@/assets/sp-icon.png"
                            class="profile-pic rounded-circle"
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
import { ref } from "vue";

export default {
    name: "addProfilePost",
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const storeProfilePost = useStoreProfilePost();

        const postText = ref("");

        const postProfilePost = async () => {
            const text = postText.value;
            const authorId = props.userData.id;

            const profilePostData = {
                text: text,
                authorId: authorId,
            };

            if (text.trim() !== "") {
                await storeProfilePost.createProfilePost(profilePostData);
            }
        };

        return {
            storeProfilePost,
            postProfilePost,
            postText,
        };
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
