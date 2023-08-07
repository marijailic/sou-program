<template>
  <div>
    <h1>DOBRO DOŠLI!</h1>
    <h2>{{ announcement.test }}</h2>
    <button @click="logout" class="btn btn-primary mt-3">Odjavi me!</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStoreAnnouncement } from "@/stores/announcement.store";

export default {
  name: "NewsfeedView",
  data() {
    return {
      announcement: [],
    };
  },
  components: {},
  setup() {
    const storeAnnouncement = useStoreAnnouncement();
    return { storeAnnouncement };
  },
  created() {
    this.getAnnouncements();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      window.location.href = "/login";
    },
    async getAnnouncements() {
      this.announcement = await this.storeAnnouncement.fetchAnnouncement();
    },
  },
};
</script>
