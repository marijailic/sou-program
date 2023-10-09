<template>
  <div class="side-navigation">
    <div class="card text-center">
      <!-- <img
                v-if="image"
                class="card-img-top rounded-circle mx-auto"
                :src="image"
            /> -->
      <img
        class="card-img-top rounded-circle mx-auto"
        src="@/assets/sp-icon.png"
      />
      <div class="card-body">
        <div class="card-title mt-1">
          <!-- <router-link class="custom-link" to="/my-profile"> -->
          <h5>{{ username }}</h5>
          <!-- </router-link> -->
        </div>
        <nav class="nav flex-column">
          <router-link to="/newsfeed" class="nav-link"
            ><i class="material-icons">article</i> Naslovnica</router-link
          >
          <router-link to="/my-profile" class="nav-link"
            ><i class="material-icons">person</i>Profil</router-link
          >
          <router-link to="/search" class="nav-link"
            ><i class="material-icons">people</i>Stalkaonica</router-link
          >
          <router-link to="/gallery" class="nav-link"
            ><i class="material-icons">photo_library</i> Galerija</router-link
          >
          <router-link to="/competitions" class="nav-link"
            ><i class="material-icons">emoji_events</i> Natjecanja</router-link
          >
        </nav>
      </div>
      <div class="nav-btns">
        <div class="info-link">
          <router-link to="/resources" class="info-btn"> Resursi</router-link>
        </div>
        <div>
          <button class="btn btn-primary" @click="logout">Odjavi me</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoreGallery } from "@/stores/gallery.store";
import { useStoreUser } from "@/stores/user.store";

export default {
  name: "navigation",
  data() {
    return {
      username: "",
      profilePictureKey: "",
      image: "",
    };
  },
  setup() {
    const storeGallery = useStoreGallery();
    const storeUser = useStoreUser();

    return { storeGallery, storeUser };
  },
  async created() {
    this.getUsername();
    await this.getAuthorUsername();
    await this.displayImage();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("type");
      window.location.href = "/login";
    },
    getUsername() {
      const username = localStorage.getItem("username");
      this.username = username;
    },
    async getAuthorUsername() {
      await this.storeUser.fetchUser();
      const user = await this.storeUser.getCurrentUser(this.username);
      this.profilePictureKey = user.profile_picture_key;
    },
    async displayImage() {
      const image = await this.storeGallery.googleDisplayImage(
        this.profilePictureKey
      );
      this.image = `data:image/jpeg;base64,${image}`;
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  height: calc(100vh - 4vw);
  border: none;
  padding-top: 2vw;
  padding-bottom: 2vw;
}
.card-img-top {
  width: 100px;
  height: 100px;
}
.card-body {
  padding-left: 0;
  padding-right: 0;
}
.custom-link {
  color: rgb(33, 37, 41);
}
.nav {
  margin-top: 3vw;
}
.nav-link {
  display: flex;
  align-items: center;
  color: rgb(33, 37, 41);
  padding: 0;
  height: 3vw;
}
.nav-link:hover {
  background-color: #f5f5f5;
}
.router-link-active {
  background-color: #f5f5f5;
}
.material-icons {
  margin-left: 1.2vw;
  margin-right: 0.5vw;
}
.nav-btns {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
}
.info-link {
  margin-bottom: 0.5vw;
}
.info-btn {
  color: rgb(33, 37, 41);
}
.btn {
  width: 100%;
}
</style>
