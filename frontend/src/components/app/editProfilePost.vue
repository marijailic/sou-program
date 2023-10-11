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

        return {
            storeProfilePost,
            postText,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async updateProfilePost() {
            console.log(this.storeProfilePost);
            const updateData = {
                id: this.props.postData.id,
                text: this.postText.value,
            };

            if (text.trim() !== "") {
                await this.storeProfilePost.updateProfilePost(updateData);
            }
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
