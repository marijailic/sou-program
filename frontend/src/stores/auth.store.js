import { defineStore } from 'pinia';
import backendApiService from '@/services/backendApiService';
import userTypeEnum from '@/enums/userTypeEnum';

export const useStoreAuth = defineStore('storeAuth', {
    state: () => ({
        user: '',
        token: '',
    }),
    getters: {
        getHeaders:
            (state) =>
            ({ auth, contentTypeJson }) => {
                let headers = {};

                if (auth) {
                    headers['Authorization'] = `Bearer ${state.checkToken()}`;
                }

                if (contentTypeJson) {
                    headers['Content-Type'] = 'application/json';
                }

                return headers;
            },
        getAuthUserType: (state) => () => {
            return state.type;
        },
        isAuthUserDemos: (state) => () => {
            return state.type === userTypeEnum.DEMOS;
        },
        isAuthenticated: (state) => {
            return !!state.token && !!state.user;
        },
    },
    actions: {
        async login(username, password) {
            const res = await backendApiService.post({
                url: '/login',
                headers: this.getAuthHeaders({ contentTypeJson: true }),
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();

            console.log(resObj);
            this.user = resObj.user;
            this.token = resObj.token;

            localStorage.setItem('token', this.token);

            this.$router.push('/newsfeed');
        },
        logout() {
            this.username = '';
            this.token = '';

            localStorage.removeItem('token');

            this.$router.push('/login');
        },
        checkToken() {
            const tokenFromLocalStorage = localStorage.getItem('token');
            if (tokenFromLocalStorage) {
                this.token = tokenFromLocalStorage;
                // TODO: Fetch the user data based on the token
            }
            return token;
        },
    },
});
