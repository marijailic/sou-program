<template>
  <div class="container mt-4">
    <h2>Dodaj novog korisnika</h2>
    <form @submit.prevent="postUser">
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
      <div class="form-group text-start">
        <label for="username">Korisničko ime</label>
        <input
          v-model="newUserUsername"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="form-group text-start">
        <label for="password">Lozinka</label>
        <input
          v-model="newUserPassword"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
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
        <textarea v-model="newUserBio" class="form-control" id="bio"></textarea>
      </div>
      <div class="form-group text-start">
        <label for="type">Tip korisnika</label>
        <select v-model="newUserType" class="form-control" id="type">
          <option value="demonstrator">Demonstrator</option>
          <option value="student">Student</option>
        </select>
      </div>
      <div class="add-btn text-end">
        <button type="submit" class="btn btn-primary text-end">Dodaj</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";
import { ref } from "vue";

export default {
  name: "addUser",
  data() {},
  setup() {
    const storeUser = useStoreUser();

    const newUserName = ref("");
    const newUserSurname = ref("");
    const newUserEmail = ref("");
    const newUserUsername = ref("");
    const newUserPassword = ref("");
    const newUserBio = ref("");
    const newUserType = ref("");

    const postUser = async () => {
      const newUserData = {
        name: newUserName.value,
        surname: newUserSurname.value,
        email: newUserEmail.value,
        username: newUserUsername.value,
        password: newUserPassword.value,
        bio: newUserBio.value,
        type: newUserType.value,
      };
      await storeUser.createUser(newUserData);
    };

    return {
      storeUser,
      postUser,
      newUserName,
      newUserSurname,
      newUserEmail,
      newUserUsername,
      newUserPassword,
      newUserBio,
      newUserType,
    };
  },
};
</script>

<style scoped>
.add-btn {
  margin-top: 1vw;
}
</style>
