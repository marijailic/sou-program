<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeAddingUser"
            :onConfirm="createUser"
            title="Dodaj korisnika"
            :isConfirmDisabled="!isFormValid"
        >
            <DynamicInput
                :label="'Ime'"
                v-model="user.name"
                :validations="validationRules.name"
            />
            <DynamicInput
                :label="'Prezime'"
                v-model="user.surname"
                :validations="validationRules.surname"
            />
            <DynamicInput
                :label="'Email'"
                v-model="user.email"
                :validations="validationRules.email"
            />
            <DynamicInput
                :label="'Korisničko ime'"
                v-model="user.username"
                :validations="validationRules.username"
            />
            <DynamicInput
                :label="'Lozinka'"
                v-model="user.password"
                :type="'password'"
                :validations="validationRules.password"
            />
            <div class="form-group">
                <label for="profilePicture">Slika profila</label>
                <input
                    type="file"
                    @change="addFile"
                    id="profilePicture"
                    class="picture-input form-control"
                    accept="image/*"
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
import { useStoreGallery } from '@/stores/gallery.store';
import { useStoreUser } from '@/stores/user.store';

import ModalForm from '@/components/app/ModalForm.vue';
import DynamicInput from '@/components/app/DynamicInput.vue';

import {
    required,
    email,
    maxLength,
    noWhitespace,
    minLength,
    containsUppercase,
    containsSpecialCharacter,
} from '@/utils/validations.js';

const props = {
    closeAddingUser: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'addUser',
    props,
    components: {
        ModalForm,
        DynamicInput,
    },
    data: function () {
        return {
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
            validationRules: {
                name: [required, maxLength(30)],
                surname: [required, maxLength(30)],
                email: [required, email],
                username: [required, maxLength(30), noWhitespace],
                password: [
                    containsUppercase,
                    containsSpecialCharacter,
                    minLength(8),
                ],
                // bio: [maxLength(250)],
            },
        };
    },
    computed: {
        isFormValid() {
            return Object.keys(this.validationRules).every((key) =>
                this.validationRules[key].every(
                    (validation) => validation(this.user[key]) === true
                )
            );
        },
    },
    methods: {
        addFile(event) {
            this.selectedImage = event.target.files[0];
        },
        async createUser() {
            if (!this.isFormValid) {
                return;
            }

            if (this.selectedImage) {
                console.log('uploading images...');
                const profilePictureKey = (
                    await this.storeGallery.googleUploadImages({
                        images: [this.selectedImage],
                        folderName: 'user',
                    })
                )[0];
                this.user.profile_picture_key = profilePictureKey;
            }

            await this.storeUser.createUser(this.user);

            this.closeAddingUser();
        },
    },
};
</script>

<style scoped>
.error-msg {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
    transition: opacity 0.3s;
}

.error-msg span {
    display: block;
}
</style>
