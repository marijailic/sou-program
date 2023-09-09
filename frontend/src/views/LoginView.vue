<template>
    <div class="container">
        <div class="about">
            <h1>Tko si?</h1>
            <div class="row">
                <div class="col-sm">
                    <form @submit="login">
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
import { saveAuthData } from "@/services/authService";

export default {
    name: "LoginView",
    data: function () {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async login(event) {
            event.preventDefault();
            const credentials = {
                username: this.username,
                password: this.password,
            };

            const response = await fetch(`${process.env.VUE_APP_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                window.location.href = "/error";
                return;
            }

            const data = await response.json();

            saveAuthData({
                username: data.username,
                type: data.type,
                token: data.token,
                refreshToken: data.refreshToken,
            });

            window.location.href = "/newsfeed";
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
