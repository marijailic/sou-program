<template>
    <div>
        <div class="card">
            <div class="header">
                <h1>Galerija</h1>
                <button class="btn btn-primary">Dodaj galeriju</button>
            </div>
        </div>
        <div class="row">
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
            <!-- <div class="col">
                <add-gallery :currentUserID="currentUserID" />
            </div> -->
        </div>
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { useStoreGallery } from "@/stores/gallery.store";

import showGallery from "@/components/showGallery.vue";
// import addGallery from "@/components/addGallery.vue";

export default {
    name: "GalleryView",
    data() {
        return {
            currentUserID: {},
            galleries: [],
        };
    },
    components: {
        showGallery,
        // addGallery,
    },
    setup() {
        const currentUserUsername = localStorage.getItem("username");
        const storeUser = useStoreUser();
        const storeGallery = useStoreGallery();
        return { storeUser, storeGallery, currentUserUsername };
    },
    async created() {
        await this.getCurrentUser();
        await this.getGalleries();
    },
    methods: {
        // https://drive.google.com/file/d/1kGbRhTTxYEkZUmG99XdWFaMyVZRh9bZ2/view?usp=sharing
        async getCurrentUser() {
            await this.storeUser.fetchUser();
            const currentUserData = await this.storeUser.getCurrentUser(
                this.currentUserUsername
            );
            this.currentUserID = currentUserData.id;
        },
        async getGalleries() {
            const galleries = await this.storeGallery.fetchGallery();
            this.galleries = galleries;
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
