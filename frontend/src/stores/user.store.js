import { defineStore } from "pinia";
import backendApiService from "@/services/backendApiService";
import userTypeEnum from "@/enums/userTypeEnum";
import imageService from "@/services/imageService";

export const useStoreUser = defineStore("storeUser", {
    state: () => ({
        users: [],
    }),
    getters: {
        currentUserUsername: () => localStorage.getItem("username"),
        isCurrentUserDemos: () => userTypeEnum.DEMOS === localStorage.getItem("type"),
        getUsersExceptCurrent: (state) => () => state.users.filter((user) =>
            state.isCurrentUserDemos ||
            user.username.toLowerCase() !== state.currentUserUsername.toLowerCase()
        ),
        getFilteredUsers: (state) => (searchText) => {
            const searchLowerCase = searchText.toLowerCase();

            return state.users.filter((user) => {
                const fullName = `${user.name} ${user.surname}`.toLowerCase();
                const reversedFullName = `${user.surname} ${user.name}`.toLowerCase();

                return (
                    state.isCurrentUserDemos &&
                    (fullName.includes(searchLowerCase) || reversedFullName.includes(searchLowerCase))
                );
            });
        },
        getCurrentUser: (state) => () => state.users.find((user) =>
            user.username.toLowerCase() === state.currentUserUsername.toLowerCase()
        ),
        getUserByID: (state) => (userID) => state.users.find((user) => user.id === Number(userID)),
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
            this.users = await Promise.all(
                resObj.data.map(async (user) => {
                    return {
                        ...user,
                        getProfilePictureSrc: async () => await imageService.getImageSrc(user.profile_picture_key),
                    }
                })
            );

            return this.users;
        },
        async deleteUser(userID) {
            const res = await backendApiService.delete({
                url: "/delete-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userID }),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async createUser(user) {
            const res = await backendApiService.post({
                url: "/create-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
        async updateUser(user) {
            const res = await backendApiService.post({
                url: "/update-user",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            window.location.href = res.ok ? "/success" : "/error";
        },
    },
});
