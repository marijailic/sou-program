<template>
    <div>
        <form @submit.prevent="updateProfilePost">
            <div class="card">
                <div class="row">
                    <div class="card-body text-start">
                        <textarea
                            v-model="postText"
                            class="form-control"
                            rows="3"
                            required
                        ></textarea>
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
            const id = props.postData.id;
            const text = postText.value;

            const updateData = {
                id: id,
                text: text,
            };

            if (text.trim() !== "") {
                await storeProfilePost.updateProfilePost(updateData);
            }
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
    background-color: #eaeaea;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: #eaeaea;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
