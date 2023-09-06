<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="first-col card-body col-md-3 d-flex justify-content-center align-items-center"
                >
                    <img class="main-pic rounded-circle" id="image" />
                </div>
                <div
                    class="second-col col-md-9 d-flex align-items-center text-start"
                >
                    <div class="card-right card-body text-start">
                        <h3 class="card-title d-inline m-0">
                            {{ galleryData.title }}
                        </h3>
                        <p class="card-text mt-2">
                            {{ galleryData.text }}
                        </p>
                        <p>
                            {{ galleryData.author_id }}
                            <span class="text-muted">
                                •
                                {{ formatDate(galleryData.timestamp) }} ago
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
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
    </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

import { formatDistanceToNow } from "date-fns";

export default {
    name: "showGallery",
    props: {
        galleryData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const imageID = "1kGbRhTTxYEkZUmG99XdWFaMyVZRh9bZ2";
        const storeGallery = useStoreGallery();
        const storeUser = useStoreUser();

        return { storeGallery, storeUser, imageID };
    },
    async created() {
        // await this.displayImage(this.imageID);
    },
    methods: {
        // async deleteGallery(idGallery) {
        //     const isConfirmed = window.confirm(
        //         "Jeste li sigurni da želite izbrisati galeriju?"
        //     );

        //     if (isConfirmed) {
        //         await this.storeGallery.deleteGallery(idGallery);
        //     }
        // },
        // openEdit() {
        //     location.href = "/gallery/" + idGallery;
        // },
        // async displayImage(imgId) {
        //     const image_ = await this.storeGallery.showImage(imgId);

        //     const imgElement = document.getElementById("image");
        //     imgElement.src = `data:image/jpeg;base64,${image_}`;
        // },
        // showAuthorUsername(userId) {
        //     const user = this.storeUser.getUserById(userId);
        //     return user.username;
        // },
        formatDate(strDate) {
            const objDate = new Date(strDate);
            const timeAgo = formatDistanceToNow(objDate);
            return timeAgo;
        },
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
.first-col {
    width: 40%;
}
.main-pic {
    width: 10vw;
    height: 10vw;
}
.second-col {
    width: 60%;
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.delete-btn {
    margin-right: 1vw;
}
</style>
