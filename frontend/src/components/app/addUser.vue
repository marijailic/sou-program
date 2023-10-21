<template>
    <div>
        <form @submit.prevent="createUser" autocomplete="off">
            <div class="card border-0 p-0 mt-3">
                <div class="row">
                    <h3 class="headline">Dodaj korisnika</h3>
                    <div class="form-group">
                        <label for="name">Ime</label>
                        <input
                            v-model.trim="user.name"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                            maxlength="30"
                        />
                    </div>
                    <div class="form-group">
                        <label for="surname">Prezime</label>
                        <input
                            v-model.trim="user.surname"
                            type="text"
                            class="form-control"
                            id="surname"
                            required
                            maxlength="30"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input
                            v-model.trim="user.email"
                            type="email"
                            class="form-control"
                            id="email"
                            required
                        />
                    </div>
                    <username-input v-model.trim="user.username" />
                    <password-input v-model.trim="user.password" />
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
                    <div class="form-group">
                        <label for="bio">Opis</label>
                        <textarea
                            v-model.trim="user.bio"
                            class="form-control"
                            id="bio"
                            maxlength="250"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="type">Tip korisnika</label>
                        <select
                            v-model="user.type"
                            class="form-control"
                            id="type"
                            required
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
                    <a class="btn btn-primary me-2" @click="closeAddingUser"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreGallery } from '@/stores/gallery.store'
import { useStoreUser } from '@/stores/user.store'
import usernameInput from '@/components/app/validation/usernameInput.vue'
import passwordInput from '@/components/app/validation/passwordInput.vue'

const props = {
    closeAddingUser: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'addUser',
    props,
    data: () => ({
        storeGallery: useStoreGallery(),
        storeUser: useStoreUser(),
        user: {
            name: '',
            surname: '',
            email: '',
            username: '',
            password: '',
            bio: '',
            type: 'student',
        },
        selectedImage: null,
    }),
    components: {
        usernameInput,
        passwordInput,
    },
    methods: {
        addFile(event) {
            this.selectedImage = event.target.files[0]
        },
        async createUser() {
            if (this.selectedImage) {
                const profilePictureKey = (
                    await this.storeGallery.googleUploadImages({
                        images: [this.selectedImage],
                        folderName: 'user',
                    })
                )[0]
                this.user.profile_picture_key = profilePictureKey
            }

            await this.storeUser.createUser(this.user)
        },
    },
}
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
    margin-bottom: 0.5em;
}
.card-footer {
    background-color: white;
}
</style>
