<template>
    <div>
        <div class="card">
            <div class="header">
                <h1>{{ galleryData.title }}</h1>
                <button class="btn btn-primary" @click="closeShow">
                    Zatvori
                </button>
            </div>
            <div class="row">
                <p class="card-text mt-2">
                    {{ galleryData.text }}
                </p>
                <p>
                    {{ authorUsername }}
                    <span class="text-muted">
                        •
                        {{ formatDate(galleryData.timestamp) }} ago
                    </span>
                </p>
            </div>

            <div class="masonry-container">
                <img v-for="image in images" :key="image" :src="image" />
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

import { formatDistanceToNow } from "date-fns";
import VueMasonry from "vue-masonry";

export default {
    name: "showFullGallery",
    components: { VueMasonry },
    data() {
        return {
            authorUsername: null,
            images: [],
        };
    },
    props: {
        galleryID: {
            type: Number,
            required: true,
        },
        closeShow: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const storeGallery = useStoreGallery();
        storeGallery.fetchGallery();
        const storeUser = useStoreUser();

        const galleryID = props.galleryID;
        const galleryData = storeGallery.getGalleryById(galleryID);

        return { storeGallery, storeUser, galleryData };
    },
    async created() {
        await this.getAuthorUsername(this.galleryData.author_id);
        await this.displayImages();
    },
    methods: {
        async getAuthorUsername(userID) {
            await this.storeUser.fetchUser();
            const user = await this.storeUser.getUserById(userID);
            this.authorUsername = user.username;
        },
        formatDate(strDate) {
            const objDate = new Date(strDate);
            const timeAgo = formatDistanceToNow(objDate);
            return timeAgo;
        },
        async displayImages() {
            const imageKeys = this.galleryData.images;

            let imagesData = [];
            for (const key of imageKeys) {
                const imageData = await this.storeGallery.googleDisplayImage(
                    key
                );
                imagesData.push(imageData);
            }

            const images = imagesData.map(
                (imageData) => "data:image/jpeg;base64," + imageData
            );
            this.images = images;
        },
        closeShow() {
            this.closeShow();
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
    margin-top: 1vw;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.row {
    padding: 0;
}
.masonry-container > * {
    width: 100%;
}
</style>
