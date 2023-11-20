<template>
    <div class="container">
        <form @submit.prevent="login">
            <div class="card">
                <h1>Tko si?</h1>
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group mt-4">
                            <label for="username">Korisničko ime</label>
                            <input
                                v-model="username"
                                type="text"
                                class="form-control"
                                id="username"
                                placeholder="Upiši korisničko ime"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="password">Lozinka</label>
                            <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Upiši lozinku"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-3">
                    Pusti me unutra!
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import authService from '@/services/authService';

export default {
    name: 'LoginView',
    data: function () {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            const credentials = {
                username: this.username,
                password: this.password,
            };

            const response = await fetch(`${process.env.VUE_APP_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            if (!response.ok) {
                window.location.href = '/error';
                return;
            }

            const resObj = await response.json();

            authService.saveAuthData(resObj.data);

            window.location.href = '/newsfeed';
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 2vw;
}
</style>
