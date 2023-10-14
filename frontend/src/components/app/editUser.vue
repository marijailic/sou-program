<template>
    <div>
        <form @submit.prevent="updateUser">
            <div class="card p-0 border-0 mt-3">
                <div class="row">
                    <h3>Uredi korisnika</h3>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="name">Ime</label>
                        <input
                            v-model.trim="user.name"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="surname">Prezime</label>
                        <input
                            v-model.trim="user.surname"
                            type="text"
                            class="form-control"
                            id="surname"
                            required
                        />
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="email">E-mail</label>
                        <input
                            v-model.trim="user.email"
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
                            v-model.trim="user.bio"
                            class="form-control"
                            id="bio"
                        ></textarea>
                    </div>
                    <div class="form-group col-lg-3 col-sm-6 text-start">
                        <label for="type">Tip korisnika</label>
                        <select
                            v-model="user.type"
                            class="form-control"
                            id="type"
                        >
                            <option value="demonstrator">Demonstrator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="closeEditing"
                        >Odustani</a
                    >
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="
                            !user.name ||
                            !user.surname ||
                            !user.email ||
                            !user.type
                        "
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
    user: {
        type: Object,
        required: true,
    },
    closeEditing: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'editUser',
    props,
    data: () => ({
        storeUser: useStoreUser(),
    }),
    methods: {
        async updateUser() {
            await this.storeUser.updateUser(this.user)
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
    background-color: #eaeaea;
}
</style>
