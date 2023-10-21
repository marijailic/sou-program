<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeAddingUser"
            :onConfirm="createUser"
            title="Dodaj korisnika"
        >
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
            <!-- <username-input v-model.trim="user.username" />
            <password-input v-model.trim="user.password" /> -->
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
        </ModalForm>
    </div>
</template>

<script>
import { useStoreGallery } from '@/stores/gallery.store'
import { useStoreUser } from '@/stores/user.store'
import usernameInput from '@/components/app/validation/usernameInput.vue'
import passwordInput from '@/components/app/validation/passwordInput.vue'

import ModalForm from '@/components/app/ModalForm.vue'

const props = {
    closeAddingUser: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'addUser',
    props,
    components: {
        ModalForm,
    },
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
    created() {
        console.log('created')
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
</style>
