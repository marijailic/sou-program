<template>
        <div class="d-flex show-gallery p-4">
            <div class="d-flex align-items-center">
                <img
                    id="image"
                    class="user-profile-image"
                    width="200"
                    height="200"
                    alt="Gallery image"
                />
                <div class="gallery-content">
                    <h1 class="h3 mb-0"> {{ galleryData.title }}</h1>
                    <p class="gallery-text mb-0">
                        {{ galleryData.text }}
                    </p>
                    <small class="text-muted">Created by {{ showAuthorUsername(userData.id) }}</small>
                </div>
            </div>
            <div class="d-flex justify-content-end h-25">
                <button
                    @click="deleteGallery(galleryData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button class="edit-btn btn btn-primary" @click="openEdit">
                    Uredi
                </button>
            </div>
        </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

export default {
    name: "showGallery",
    data() {
        return {};
    },
    props: {
        galleryData: {
            type: Object,
            required: true,
        },
        userData: {
            type: Object,
            required: true,
        }
    },
    setup() {
        const imageId = "1kGbRhTTxYEkZUmG99XdWFaMyVZRh9bZ2";
        const storeGallery = useStoreGallery();        
        const storeUser = useStoreUser();

        return { storeGallery, storeUser, imageId };
    },
    async created() {
        await this.displayImage(this.imageId);
    },
    methods: {
        async deleteGallery(idGallery) {
            const isConfirmed = window.confirm(
                "Jeste li sigurni da želite izbrisati galeriju?"
            );

            if (isConfirmed) {
                await this.storeGallery.deleteGallery(idGallery);
            }
        },
        openEdit() {
            location.href = "/gallery/" + idGallery;
        },
        async displayImage(imgId) {
            const image_ = await this.storeGallery.showImage(imgId);

            const imgElement = document.getElementById('image');
            imgElement.src = `data:image/jpeg;base64,${image_}`;
        },
        showAuthorUsername(userId) {
            const user = this.storeUser.getUserById(userId);
            return user.username;
        }
    },
};
</script>

<style scoped>
.show-gallery {
    padding-bottom: 2vw;
    padding-left: 2vw;
    padding-right: 2vw;
}
.gallery-text {
    text-align: left;
}
.delete-btn {
    margin-top: 1vw;
    margin-right: 1vw;
}
.edit-btn {
    margin-top: 1vw;
}
</style>
