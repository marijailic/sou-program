<template>
    <div>
        <ModalForm
            :isOpen="true"
            :onClose="closeEditingUser"
            :onConfirm="updateUser"
            :disabled="!userName || !userSurname || !userType"
            title="Uredi korisnika"
        >
            <div class="form-group">
                <label for="name">Ime</label>
                <input
                    v-model.trim="userName"
                    type="text"
                    class="form-control"
                    id="name"
                    required
                />
            </div>
            <div class="form-group">
                <label for="surname">Prezime</label>
                <input
                    v-model.trim="userSurname"
                    type="text"
                    class="form-control"
                    id="surname"
                    required
                />
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input
                    v-model.trim="userEmail"
                    type="email"
                    class="form-control"
                    id="email"
                    required
                />
            </div>
            <div class="form-group">
                <label for="bio">Opis</label>
                <textarea
                    v-model.trim="userBio"
                    class="form-control"
                    id="bio"
                ></textarea>
            </div>
            <div class="form-group">
                <label for="type">Tip korisnika</label>
                <select v-model="userType" class="form-control" id="type">
                    <option value="demonstrator">Demonstrator</option>
                    <option value="student">Student</option>
                </select>
            </div>
        </ModalForm>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'

import ModalForm from './ModalForm.vue'

const props = {
    userID: {
        type: Number,
        required: true,
    },
    closeEditingUser: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'editUser',
    props,
    components: {
        ModalForm,
    },
    data() {
        const storeUser = useStoreUser()
        const user = storeUser.getUserByID(this.userID)

        return {
            user,
            userName: user.name,
            userSurname: user.surname,
            userEmail: user.email,
            userBio: user.bio,
            userType: user.type,
        }
    },
    methods: {
        async updateUser() {
            const updatedUser = {
                ...user,
                name: this.userName,
                surname: this.surname,
                email: this.userEmail,
                bio: this.user,
                type: this.userType,
            }

            await this.storeUser.updateUser(updatedUser)
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
.card,
.card-footer {
    background-color: var(--white-color-2);
}
</style>
