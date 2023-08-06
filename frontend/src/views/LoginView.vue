<template>
  <div class="container">
    <div class="about">
      <h1>Tko si?</h1>
      <div class="row">
        <div class="col-sm">
          <form @submit="sendCredentials">
            <div class="form-group mt-4">
              <label for="username">Korisničko ime</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Upišite korisničko ime"
              />
            </div>
            <div class="form-group mt-3">
              <label for="password">Lozinka</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Upišite lozinku"
              />
            </div>
            <button type="submit" class="btn btn-primary mt-3">
              Pusti me unutra!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    sendCredentials(event) {
      event.preventDefault();
      const credentials = {
        username: this.username,
        password: this.password,
      };

      // console.log(credentials);

      axios
        .post(`${process.env.VUE_APP_URL}/login`, credentials)
        .then((response) => {
          if (response.status === 200 && response.data.token) {
            // console.log("TOKEN", response.data.token);
            // console.log("REFRESH TOKEN", response.data.refreshToken);
            // console.log("USERNAME", response.data.username);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("username", response.data.username);
            window.location.href = "/";
          } else {
            console.log("Unauthorized", response);
          }
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    },
  },
};
</script>

<style scoped>
.container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about {
  width: 40%;
}
</style>
