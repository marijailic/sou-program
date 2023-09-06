<template>
    <div>
        <form @submit.prevent="postGallery">
            <div class="card">
                <div class="row">
                    <h3 class="headline">Dodaj galeriju</h3>

                    <div class="form-group">
                        <label for="title">Naslov</label>
                        <input
                            type="text"
                            v-model="newGalleryTitle"
                            id="title"
                            class="form-control"
                        />
                    </div>
                    <div class="form-group">
                        <label for="text">Tekst</label>
                        <textarea
                            type="text"
                            v-model="newGalleryText"
                            id="text"
                            class="form-control"
                        ></textarea>
                    </div>
                    <!-- <div class="form-group">
                        <input
                            type="file"
                            multiple
                            @change="handleFiles"
                            id="files"
                            class="picture-input form-control"
                        />
                        <p>Odabrane slike</p>
                        <ul>
                            <li v-for="file in selectedFiles" :key="file.name">
                                {{ file.name }}
                            </li>
                        </ul>
                        <p v-if="selectedFiles.length === 0">
                            Nijedna slika nije odabrana
                        </p>
                    </div> -->
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary">Odustani</a>
                    <button type="submit" class="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

import { ref } from "vue";

export default {
    name: "addGallery",
    data() {
        return {
            selectedFiles: [],
        };
    },
    setup() {
        const currentUserUsername = localStorage.getItem("username");

        const storeGallery = useStoreGallery();
        const storeUser = useStoreUser();

        const newGalleryTitle = ref("");
        const newGalleryText = ref("");
        const currentUserID = ref("");

        const postGallery = async () => {
            const newGalleryData = {
                title: newGalleryTitle.value,
                text: newGalleryText.value,
                author_id: currentUserID.value,
            };
            await storeGallery.createGallery(newGalleryData);
        };

        return {
            currentUserUsername,
            storeGallery,
            storeUser,
            postGallery,
            newGalleryTitle,
            newGalleryText,
            currentUserID,
        };
    },
    async created() {
        await this.getCurrentUser();
    },
    methods: {
        async getCurrentUser() {
            await this.storeUser.fetchUser();
            const currentUserData = await this.storeUser.getCurrentUser(
                this.currentUserUsername
            );
            this.currentUserID = currentUserData.id;
        },
        // handleFiles(event) {
        //     for (let i = 0; i < event.target.files.length; i++) {
        //         this.selectedFiles.push(event.target.files[i]);
        //     }
        // },
        // async postGallery() {
        //     const title = this.newGalleryTitle;
        //     const text = this.newGalleryText;
        //     console.log("selectedFiles:", this.selectedFiles);
        //     const newGalleryData = {
        //         title,
        //         text,
        //         author_id: this.authorID,
        //     };
        //     await this.storeGallery.createFullGallery(
        //         newGalleryData,
        //         this.selectedFiles
        //     );
        //     alert("Upload complete!");
        // },
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
.headline {
    margin-bottom: 1vw;
}
.form-group {
    margin-bottom: 1vw;
}
.picture-input {
    margin-bottom: 1vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
