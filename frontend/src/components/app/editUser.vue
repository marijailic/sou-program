<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditingUser"
            :onConfirm="updateUser"
            title="Uredi korisnika"
            :disabled="!isFormValid"
        >
            <Input
                :label="'Ime'"
                v-model="user.name"
                :validations="validationRules.name"
            />
            <Input
                :label="'Prezime'"
                v-model="user.surname"
                :validations="validationRules.surname"
            />
            <Input
                :label="'Email'"
                v-model="user.email"
                :validations="validationRules.email"
            />
            <div class="form-group">
                <label for="bio">Opis</label>
                <textarea
                    v-model.trim="user.bio"
                    class="form-control"
                    id="bio"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="type">Tip korisnika</label>
                <select v-model="user.type" class="form-control" id="type">
                    <option value="demonstrator">Demonstrator</option>
                    <option value="student">Student</option>
                </select>
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';

import ModalForm from '@/components/app/ModalForm.vue';
import Input from '@/components/app/Input.vue';

import { required, email, maxLength } from '@/utils/validations.js';

const props = {
    userID: {
        type: Number,
        required: true,
    },
    closeEditingUser: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editUser',
    props,
    components: {
        ModalForm,
        Input,
    },
    data() {
        const storeUser = useStoreUser();
        const user = storeUser.getUserByID(this.userID);
        user.email = user.e_mail;

        return {
            storeUser,
            user,
            validationRules: {
                name: [required, maxLength(30)],
                surname: [required, maxLength(30)],
                email: [required, email],
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
        async updateUser() {
            if (!this.isFormValid) {
                return;
            }

            const cleanUser = {
                id: this.user.id,
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
                bio: this.user.bio,
                type: this.user.type,
            };

            await this.storeUser.updateUser(cleanUser);
        },
    },
};
</script>
