<template>
  <div>
    <h1>NEWSFEED</h1>
    <button @click="logout" class="btn btn-primary mt-3">Odjavi me!</button>

    <add-announcement />

    <show-announcement
      v-for="announcement in announcements"
      :key="announcement.id"
      :announcementData="announcement"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { useStoreAnnouncement } from "@/stores/announcement.store";

import addAnnouncement from "@/components/addAnnouncement.vue";
import showAnnouncement from "@/components/showAnnouncement.vue";

export default {
  name: "NewsfeedView",
  data() {
    return {
      announcements: [],
    };
  },
  components: {
    addAnnouncement,
    showAnnouncement,
  },
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
      const announcements = await this.storeAnnouncement.fetchAnnouncement();
      this.announcements = announcements;
    },
  },
};
</script>
