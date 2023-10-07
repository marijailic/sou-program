<template>
    <div>
        <form @submit.prevent="editUser">
            <div class="card border-0 p-0 mt-3">
                <div class="row">
                    <h3 class="headline">Uredi korisnika</h3>
                    <div class="form-group text-start">
                        <label for="name">Ime</label>
                        <input
                            v-model="newUserName"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group text-start">
                        <label for="surname">Prezime</label>
                        <input
                            v-model="newUserSurname"
                            type="text"
                            class="form-control"
                            id="surname"
                            required
                        />
                    </div>
                    <div class="form-group text-start">
                        <label for="e_mail">E-mail</label>
                        <input
                            v-model="newUserEmail"
                            type="email"
                            class="form-control"
                            id="e_mail"
                            required
                        />
                    </div>
                    <!-- <div class="form-group text-start">
                        <label for="username">Korisničko ime</label>
                        <input
                            v-model="newUserUsername"
                            type="text"
                            class="form-control"
                            id="username"
                            required
                        />
                    </div> -->
                    <!-- <div class="form-group text-start">
                        <label for="password">Lozinka</label>
                        <input
                            v-model="newUserPassword"
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
                    <div class="form-group text-start">
                        <label for="bio">Opis</label>
                        <textarea
                            v-model="newUserBio"
                            class="form-control"
                            id="bio"
                        ></textarea>
                    </div>
                    <div class="form-group text-start">
                        <label for="type">Tip korisnika</label>
                        <select
                            v-model="newUserType"
                            class="form-control"
                            id="type"
                        >
                            <option value="demonstrator">Demonstrator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="btn btn-primary me-2" @click="closeEdit"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Uredi</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";

export default {
    name: "editUser",
    props: {
        userID: {
            type: Number,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    data() {
        const storeUser = useStoreUser();
        storeUser.fetchUser();

        const userData = storeUser.getUserById(this.userID);

        return {
            storeUser: storeUser,
            newUserName: userData.name,
            newUserSurname: userData.surname,
            newUserEmail: userData.e_mail,
            // newUserUsername: userData.username,
            // newUserPassword: userData.password,
            newUserBio: userData.bio,
            newUserType: userData.type,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async editUser() {
            const updateData = {
                id: this.userID,
                name: this.newUserName,
                surname: this.newUserSurname,
                email: this.newUserEmail,
                // username: this.newUserUsername,
                // password: this.newUserPassword,
                bio: this.newUserBio,
                type: this.newUserType,
            };
            await this.storeUser.updateUser(updateData);
        }
    },
};
</script>

<style scoped>
.card {
    background-color: #eaeaea;
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
    background-color: #eaeaea;
}
</style>
