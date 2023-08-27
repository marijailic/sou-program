import { defineStore } from "pinia";

export const useStoreUser = defineStore("storeUser", {
    state: () => ({
        user: [],
    }),
    getters: {
        getFilteredUsers: (state) => (searchText) => {
            const filteredUsers = state.user.filter((user) => {
                const fullName = `${user.name} ${user.surname}`;
                const reversedFullName = `${user.surname} ${user.name}`;

                return (
                    fullName.toLowerCase().includes(searchText.toLowerCase()) ||
                    reversedFullName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                );
            });
            return filteredUsers;
        },
        getCurrentUser: (state) => (username) => {
            const currentUser = state.user.find((user) => {
                return user.username.toLowerCase() === username.toLowerCase();
            });
            return currentUser;
        },
        getUserById: (state) => (userID) => {
            const user = state.user.find((user) => {
                return user.id === Number(userID);
            });
            return user;
        },
    },
    actions: {
        async fetchUser() {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }

            const resObj = await res.json();
            this.user = resObj.data;

            return resObj.data;
        },
        async deleteUser(idUser) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/delete-user`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
                body: JSON.stringify({ id: idUser }),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async createUser(newUserData) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
                body: JSON.stringify(newUserData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
        async updateUser(updateData) {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            const username = localStorage.getItem("username");

            const res = await fetch(`${process.env.VUE_APP_URL}/update-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    RefreshToken: refreshToken,
                    Username: username,
                },
                body: JSON.stringify(updateData),
            });

            if (!res.ok) {
                window.location.href = "/error";
                return;
            }
            window.location.href = "/success";
        },
    },
});
