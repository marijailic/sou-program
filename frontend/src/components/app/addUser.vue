<template>
  <div>
    <form @submit.prevent="postUser">
      <div class="card">
        <div class="row">
          <h3 class="headline">Dodaj korisnika</h3>

          <div class="form-group">
            <label for="name">Ime</label>
            <input
              v-model="newUserName"
              type="text"
              class="form-control"
              id="name"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="surname">Prezime</label>
            <input
              v-model="newUserSurname"
              type="text"
              class="form-control"
              id="surname"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="e_mail">E-mail</label>
            <input
              v-model="newUserEmail"
              type="email"
              class="form-control"
              id="e_mail"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="username">Korisničko ime</label>
            <input
              v-model="newUserUsername"
              type="text"
              class="form-control"
              id="username"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="password">Lozinka</label>
            <input
              v-model="newUserPassword"
              type="password"
              class="form-control"
              id="password"
              required
              autocomplete="off"
            />
          </div>
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
          <!-- <div class="form-group">
                        <label for="profilePicture">Profilna slika</label>
                        <input
                            type="file"
                            class="form-control-file"
                            id="profilePicture"
                            accept="image/*"
                            @change="handleProfilePictureChange"
                        />
                    </div> -->
          <div class="form-group">
            <label for="bio">Opis</label>
            <textarea
              v-model="newUserBio"
              class="form-control"
              id="bio"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="type">Tip korisnika</label>
            <select v-model="newUserType" class="form-control" id="type">
              <option value="" disabled selected>Odaberi tip korisnika</option>
              <option value="demonstrator">Demonstrator</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
        <div class="card-footer text-end">
          <a class="escape-btn btn btn-primary" @click="closeAdd">Odustani</a>
          <button type="submit" class="btn btn-primary">Dodaj</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

import { ref } from "vue";

export default {
  name: "addUser",
  data() {},
  props: {
    closeAdd: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const storeGallery = useStoreGallery();
    const storeUser = useStoreUser();

    const newUserName = ref("");
    const newUserSurname = ref("");
    const newUserEmail = ref("");
    const newUserUsername = ref("");
    const newUserPassword = ref("");
    const newUserBio = ref("");
    const newUserType = ref("");

    const selectedImage = ref([]);

    const postUser = async () => {
      const profilePictureKey = await storeGallery.googleUploadImages({
        images: selectedImage.value,
        folderName: "user",
      });

      const newUserData = {
        name: newUserName.value,
        surname: newUserSurname.value,
        email: newUserEmail.value,
        username: newUserUsername.value,
        password: newUserPassword.value,
        profile_picture_key: profilePictureKey[0],
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
      selectedImage,
    };
  },
  methods: {
    addFile(event) {
      this.selectedImage.push(...event.target.files);
    },
    closeAdd() {
      this.closeAdd();
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  padding: 0;
  margin-top: 1vw;
}
.row {
  padding: 1vw;
}
.headline {
  margin-bottom: 1vw;
}
.form-group {
  margin-bottom: 1vw;
}
.card-footer {
  padding: 0.7vw;
  background-color: white;
}
.escape-btn {
  margin-right: 1vw;
}
</style>
