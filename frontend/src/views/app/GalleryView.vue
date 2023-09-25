<template>
    <div>
        <div class="card">
            <div class="header">
                <h1>Galerija</h1>
                <button class="btn btn-primary" @click="openAddGallery">
                    Dodaj galeriju
                </button>
            </div>
        </div>
        <div class="row" v-if="!showFullGallery">
            <div class="col">
                <show-gallery
                    v-for="gallery in galleries"
                    :key="gallery.id"
                    :galleryData="gallery"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="galleries.length === 0"
                >
                    <h1 class="mt-5">Nema galerija...</h1>
                </div>
            </div>
            <div class="col" v-if="addGallery || editGallery">
                <add-gallery :closeAdd="closeAdd" v-if="addGallery" />
                <edit-gallery
                    :galleryID="editGalleryID"
                    :closeEdit="closeEdit"
                    v-if="editGallery"
                />
            </div>
        </div>
        <div class="row" v-if="showFullGallery">
            <div class="col">
                <show-full-gallery
                    :galleryID="showFullGalleryID"
                    :closeShow="closeShow"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import eventBus from "@/eventBus";

import showGallery from "@/components/app/showGallery.vue";
import addGallery from "@/components/app/addGallery.vue";
import editGallery from "@/components/app/editGallery.vue";
import showFullGallery from "@/components/app/showFullGallery.vue";

export default {
    name: "GalleryView",
    data() {
        return {
            galleries: [],
            closeAdd: () => {},
            closeEdit: () => {},
            closeShow: () => {},
            addGallery: false,
            editGallery: false,
            editGalleryID: null,
            showFullGallery: false,
            showFullGalleryID: null,
        };
    },
    components: {
        showGallery,
        addGallery,
        editGallery,
        showFullGallery,
    },
    setup() {
        const storeGallery = useStoreGallery();
        return { storeGallery };
    },
    async created() {
        await this.getGalleries();

        this.openEditGallery();
        this.openShowFullGallery();

        this.closeAdd = () => {
            this.addGallery = false;
        };
        this.closeEdit = () => {
            this.editGallery = false;
        };
        this.closeShow = () => {
            this.showFullGallery = false;
        };
    },
    methods: {
        async getGalleries() {
            const galleries = await this.storeGallery.fetchGallery();
            this.galleries = galleries;
        },
        rightColActiveCheck() {
            this.addGallery = false;
            this.editGallery = false;
            this.showFullGallery = false;
        },
        openAddGallery() {
            this.rightColActiveCheck();
            this.addGallery = true;
        },
        openEditGallery() {
            eventBus.on("editGallery", (editObj) => {
                this.rightColActiveCheck();
                this.editGalleryID = editObj.editGalleryID;
                this.$nextTick(() => {
                    this.editGallery = editObj.editGallery;
                });
            });
        },
        openShowFullGallery() {
            eventBus.on("showFullGallery", (editObj) => {
                this.rightColActiveCheck();
                this.showFullGalleryID = editObj.showFullGalleryID;
                this.$nextTick(() => {
                    this.showFullGallery = editObj.showFullGallery;
                });
            });
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
