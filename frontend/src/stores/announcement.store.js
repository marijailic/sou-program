import { defineStore } from "pinia";

export const useStoreAnnouncement = defineStore("storeAnnouncement", {
  state: () => ({
    announcement: [],
  }),
  getters: {},
  actions: {
    async fetchAnnouncement() {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const username = localStorage.getItem("username");

      const res = await fetch(`${process.env.VUE_APP_URL}/announcement`, {
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: refreshToken,
          Username: username,
        },
      });
      const data = await res.json();
      // console.log(data);
      //   this.announcement = data;
      return data;
    },
  },
});
