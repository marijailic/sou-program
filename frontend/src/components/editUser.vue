<template>
    <div>
        <form @submit.prevent="editUser">
            <div class="card">
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
                    <a class="escape-btn btn btn-primary">Odustani</a>
                    <button type="submit" class="btn btn-primary">Uredi</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { ref } from "vue";

export default {
    name: "editUser",
    data() {},
    props: {
        userID: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const storeUser = useStoreUser();
        storeUser.fetchUser();

        const userID = props.userID;
        const userData = storeUser.getUserById(userID);

        const newUserName = ref(userData.name);
        const newUserSurname = ref(userData.surname);
        const newUserEmail = ref(userData.e_mail);
        // const newUserUsername = ref(userData.username);
        // const newUserPassword = ref(userData.password);
        const newUserBio = ref(userData.bio);
        const newUserType = ref(userData.type);

        const editUser = async () => {
            const id = userData.id;

            const updateData = {
                id: id,
                name: newUserName.value,
                surname: newUserSurname.value,
                email: newUserEmail.value,
                // username: newUserUsername.value,
                // password: newUserPassword.value,
                bio: newUserBio.value,
                type: newUserType.value,
            };
            await storeUser.updateUser(updateData);
        };

        return {
            storeUser,
            editUser,
            newUserName,
            newUserSurname,
            newUserEmail,
            //   newUserUsername,
            //   newUserPassword,
            newUserBio,
            newUserType,
        };
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
    background-color: #eaeaea;
}
.row {
    padding: 1vw;
}
.headline {
    margin-top: 0.5vw;
    margin-bottom: 1vw;
}
.form-group {
    margin-bottom: 1vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: #eaeaea;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
