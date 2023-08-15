import { defineStore } from "pinia";

export const useStoreAnnouncement = defineStore("storeAnnouncement", {
  state: () => ({
    announcement: [],
  }),
  getters: {
    getAllAnnouncements: (state) => () => {
      const announcements = state.announcement;
      return announcements;
    },
  },
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

      if (!res.ok) {
        window.location.href = "/error";
        return;
      }

      const resObj = await res.json();
      this.announcement = resObj.data;

      return resObj.data;
    },
    async deleteAnnouncement(idAnnouncement) {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const username = localStorage.getItem("username");

      const res = await fetch(
        `${process.env.VUE_APP_URL}/delete-announcement`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            Username: username,
          },
          body: JSON.stringify({ id: idAnnouncement }),
        }
      );

      if (!res.ok) {
        window.location.href = "/error";
        return;
      }
      window.location.href = "/success";
    },
  },
});
