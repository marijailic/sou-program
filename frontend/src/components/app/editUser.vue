<template>
    <div>
        <form @submit.prevent="updateUser">
            <div class="card p-0 border-0 mt-3">
                <div class="row">
                    <h3>Uredi korisnika</h3>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="name">Ime</label>
                        <input
                            v-model.trim="userName"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="surname">Prezime</label>
                        <input
                            v-model.trim="userSurname"
                            type="text"
                            class="form-control"
                            id="surname"
                            required
                        />
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="email">E-mail</label>
                        <input
                            v-model.trim="userEmail"
                            type="email"
                            class="form-control"
                            id="email"
                            required
                        />
                    </div>
                    <!-- <div class="form-group text-start">
                        <label for="username">Korisničko ime</label>
                        <input
                            v-model.trim="user.username"
                            type="text"
                            class="form-control"
                            id="username"
                            required
                        />
                    </div> -->
                    <!-- <div class="form-group text-start">
                        <label for="password">Lozinka</label>
                        <input
                            v-model.trim="user.password"
                            type="password"
                            class="form-control"
                            id="password"
                            required
                        />
                    </div> -->
                    <!-- <div class="form-group text-start">
                        <label for="profilePicture">Profilna slika</label>
                        <input
                            type="file"
                            class="form-control-file"
                            id="profilePicture"
                            accept="image/*"
                            @change="handleProfilePictureChange"
                        />
                    </div> -->
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="bio">Opis</label>
                        <textarea
                            v-model.trim="userBio"
                            class="form-control"
                            id="bio"
                        ></textarea>
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="type">Tip korisnika</label>
                        <select
                            v-model="userType"
                            class="form-control"
                            id="type"
                        >
                            <option value="demonstrator">Demonstrator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="closeEditingUser"
                        >Odustani</a
                    >
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="!userName || !userSurname || !userType"
                    >
                        Spremi promjenu
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store'

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
