<template>
    <div>
        <form @submit.prevent="updateProfilePost">
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
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeEdit">
                        Odustani
                    </a>
                    <button type="submit" class="btn btn-primary">
                        Spremi promjenu
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
    name: "editProfilePost",
    props: {
        postData: {
            type: Object,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const storeProfilePost = useStoreProfilePost();

        const postText = ref(props.postData.text);

        const updateProfilePost = async () => {
            const text = postText.value;
            const id = props.postData.id;

            const updateData = {
                id: id,
                text: text,
            };
            await storeProfilePost.updateProfilePost(updateData);
        };

        return {
            storeProfilePost,
            updateProfilePost,
            postText,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
    margin-bottom: 1vw;
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
.escape-btn {
    margin-right: 1vw;
}
</style>
