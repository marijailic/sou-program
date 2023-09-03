<template>
    <div class="container mt-4">
      <h2>Unesi novu galeriju</h2>
      <form @submit.prevent="postGallery">
        <div class="form-group text-start">
            <label for="title">Naslov</label>
            <input type="text" v-model="newTitle" id="title" class="form-control"/>
        </div>
        <div class="form-group text-start">
            <label for="text">Tekst</label>
            <textarea type="text" v-model="newText" id="text" class="form-control"></textarea>
        </div>
        <!-- File Input -->
        <div class="form-group text-start">
            <input type="file" multiple @change="handleFiles" id="files" class="mt-3 form-control"/>
            <!-- List of selected files -->
            <p>Inserted files</p>
            <ul>
                <li v-for="file in selectedFiles" :key="file.name">
                    {{ file.name }}
                </li>
            </ul>
            <p v-if="selectedFiles.length === 0">
                No files chosen
            </p>
        </div>
        <!-- Upload Button -->
        <button type="submit" class="btn btn-primary text-end">Upload</button>
    </form>
</div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { ref } from "vue";

export default {
    name: "addGallery",
    data() {
        return {
            selectedFiles: []
        };
    },
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const storeGallery = useStoreGallery();

        const newTitle = ref("")
        const newText = ref("")
        const authorId = props.userData.id

        return {
            storeGallery,
            newTitle,
            newText,
            authorId
        }
    },
    methods: {
        handleFiles(event) {
            for (let i = 0; i < event.target.files.length; i++) {
                this.selectedFiles.push(event.target.files[i]);
            }
        },
        async postGallery() {
            const title = this.newTitle;
            const text = this.newText;

            console.log("selectedFiles:", this.selectedFiles)

            const newGalleryData = {
                title,
                text,
                author_id: this.authorId
            }
            await this.storeGallery.createFullGallery(newGalleryData, this.selectedFiles)

            alert("Upload complete!");
        }

    }
};
</script>
