import { defineStore } from "pinia";
import backendApiService from "@/services/backendApiService";
import userTypeEnum from "@/enums/userTypeEnum";

export const useStoreUser = defineStore("storeUser", {
    state: () => ({
        user: [],
    }),
    getters: {
        getUsersExceptCurrent: (state) => () => {
            const currentUser = localStorage.getItem("username");
            const isDemos = userTypeEnum.DEMOS === localStorage.getItem("type");

            return isDemos
                ? state.user
                : state.user.filter((user) => {
                      return (
                          user.username.toLowerCase() !==
                          currentUser.toLowerCase()
                      );
                  });
        },
        getFilteredUsers: (state) => (searchText) => {
            const currentUser = localStorage.getItem("username");
            const isDemos = userTypeEnum.DEMOS === localStorage.getItem("type");

            const filteredUsers = state.user.filter((user) => {
                const fullName = `${user.name} ${user.surname}`;
                const reversedFullName = `${user.surname} ${user.name}`;

                const userFullName = fullName.toLowerCase();
                const reversedUserFullName = reversedFullName.toLowerCase();
                const searchLowerCase = searchText.toLowerCase();

                const userFound =
                    userFullName.includes(searchLowerCase) ||
                    reversedUserFullName.includes(searchLowerCase);

                const isSelf =
                    user.username.toLowerCase() === currentUser.toLowerCase();
                return userFound && (!isSelf || isDemos);
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
            const res = await backendApiService.get({
                url: "/user",
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
            const res = await backendApiService.delete({
                url: "/delete-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idUser }),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async createUser(newUserData) {
            const res = await backendApiService.post({
                url: "/create-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateUser(updateData) {
            const res = await backendApiService.post({
                url: "/update-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
