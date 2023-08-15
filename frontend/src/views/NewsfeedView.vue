<template>
  <div>
    <h1>DOBRO DOŠLI!</h1>
    <div v-for="objava in announcement" :key="objava.id" value="objava.id">
      <h2>
        {{ objava.text }}
      </h2>
      <button
        @click="deleteAnnouncement(objava.id)"
        class="btn btn-primary mt-3"
      >
        Izbriši
      </button>
    </div>
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
      const objave = await this.storeAnnouncement.fetchAnnouncement();
      this.announcement = objave;
    },
    async deleteAnnouncement(idObjava) {
      const isConfirmed = window.confirm(
        "Jeste li sigurni da želite izbrisati objavu?"
      );

      if (isConfirmed) {
        const response = await this.storeAnnouncement.deleteAnnouncement(
          idObjava
        );
        if (response && response.success) {
          alert(response.message);
        }
      }
    },
  },
};
</script>
