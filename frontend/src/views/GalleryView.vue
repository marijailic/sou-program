<template>
    <div class="container">
        <h1>GALLERY</h1>
        <add-gallery :userData="this.currentUserData"/>

        <h1 class="mt-5" v-if="galleries.length === 0">
            Nema galerija...
        </h1>
        <show-gallery
            v-for="gallery in galleries"
            :key="gallery.id"
            :galleryData="gallery"
            :userData="this.currentUserData"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

import addGallery from "@/components/addGallery.vue";
import showGallery from "@/components/showGallery.vue";

export default {
    name: "GalleryView",
    data() {
        return {
            currentUserData: {},
            galleries: [],
        };
    },
    components: {
        addGallery,
        showGallery,
    },
    setup() {
        const currentUsername = localStorage.getItem("username");
        const storeGallery = useStoreGallery();
        const storeUser = useStoreUser();
        return { storeGallery, storeUser, currentUsername };
    },
    async created() {
        await this.getCurrentUser();
        await this.getGalleries();
    },
    methods: {
        // https://drive.google.com/file/d/1kGbRhTTxYEkZUmG99XdWFaMyVZRh9bZ2/view?usp=sharing
        async getGalleries() {
            const galleries =
                await this.storeGallery.fetchGallery();
            this.galleries = galleries;
        },
        async getCurrentUser() {
            await this.storeUser.fetchUser();
            const currentUserData = await this.storeUser.getCurrentUser(
                this.currentUsername
            );
            this.currentUserData = currentUserData;
        }
    },
};
</script>
