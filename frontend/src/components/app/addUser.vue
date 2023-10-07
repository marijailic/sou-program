<template>
    <div>
        <form @submit.prevent="postUser">
            <div class="card border-0 p-0 mt-3">
                <div class="row">
                    <h3 class="headline">Dodaj korisnika</h3>
                    <div class="form-group">
                        <label for="name">Ime</label>
                        <input
                            v-model="newUserName"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="surname">Prezime</label>
                        <input
                            v-model="newUserSurname"
                            type="text"
                            class="form-control"
                            id="surname"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="e_mail">E-mail</label>
                        <input
                            v-model="newUserEmail"
                            type="email"
                            class="form-control"
                            id="e_mail"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="username">Korisničko ime</label>
                        <input
                            v-model="newUserUsername"
                            type="text"
                            class="form-control"
                            id="username"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Lozinka</label>
                        <input
                            v-model="newUserPassword"
                            type="password"
                            class="form-control"
                            id="password"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="profilePicture">Slika profila</label>
                        <input
                            type="file"
                            @change="addFile"
                            id="profilePicture"
                            class="picture-input form-control"
                            accept="image/*"
                            required
                        />
                    </div>
                    <!-- <div class="form-group">
                        <label for="profilePicture">Profilna slika</label>
                        <input
                            type="file"
                            class="form-control-file"
                            id="profilePicture"
                            accept="image/*"
                            @change="handleProfilePictureChange"
                        />
                    </div> -->
                    <div class="form-group">
                        <label for="bio">Opis</label>
                        <textarea
                            v-model="newUserBio"
                            class="form-control"
                            id="bio"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="type">Tip korisnika</label>
                        <select
                            v-model="newUserType"
                            class="form-control"
                            id="type"
                        >
                            <option value="" disabled selected>
                                Odaberi tip korisnika
                            </option>
                            <option value="demonstrator">Demonstrator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="closeAdd"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

export default {
    name: "addUser",
    props: {
        closeAdd: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            storeGallery: useStoreGallery(),
            storeUser: useStoreUser(),
            newUserName: "",
            newUserSurname: "",
            newUserEmail: "",
            newUserUsername: "",
            newUserPassword: "",
            newUserBio: "",
            newUserType: "",
            selectedImage: [],
        };
    },
    methods: {
        addFile(event) {
            this.selectedImage.push(...event.target.files);
        },
        closeAdd() {
            this.closeAdd();
        },
        async postUser() {
            const profilePictureKey = await this.storeGallery.googleUploadImages({
                images: this.selectedImage,
                folderName: "user",
            });

            const newUserData = {
                name: this.newUserName,
                surname: this.newUserSurname,
                email: this.newUserEmail,
                username: this.newUserUsername,
                password: this.newUserPassword,
                profile_picture_key: profilePictureKey[0],
                bio: this.newUserBio,
                type: this.newUserType,
            };

            await this.storeUser.createUser(newUserData);
        }
    },
};
</script>

<style scoped>
.card {
    min-width: 15rem;
}
.row {
    padding: 1em;
}
.headline {
    margin-bottom: 1em;
}
.form-group {
    margin-bottom: .5em;
}
.card-footer {
    background-color: white;
}
</style>
