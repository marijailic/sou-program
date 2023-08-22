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
          reversedFullName.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      return filteredUsers;
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
  },
});
