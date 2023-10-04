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
    data() {
        return {
            storeProfilePost: useStoreProfilePost(),
            postText: this.postData.text,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async updateProfilePost() {
            const updateData = {
                id: this.postData.id,
                text: this.postText
            };

            if (this.postText.trim() !== "") {
                await this.storeProfilePost.updateProfilePost(updateData);
            }
        }
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
