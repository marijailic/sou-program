<template>
  <div>
    <div class="show-announcement">
      <div class="d-flex align-items-center">
        <img
          src="user-profile-image-url"
          class="user-profile-image rounded-circle"
        />
        <div class="announcement-content">
          <p class="announcement-text mb-0">{{ announcementData.text }}</p>
          <!-- <small class="text-muted">{{}}</small> -->
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button
          @click="deleteAnnouncement(announcementData.id)"
          class="delete-btn btn btn-primary"
        >
          Izbriši
        </button>
        <button class="edit-btn btn btn-primary" @click="openEdit">
          Uredi
        </button>
      </div>
    </div>

    <edit-announcement :announcementData="announcementData" v-if="editText" />
  </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";
import eventBus from "@/eventBus";

import editAnnouncement from "./editAnnouncement.vue";

export default {
  name: "showAnnouncement",
  components: {
    editAnnouncement,
  },
  data() {
    return { editText: false };
  },
  props: {
    announcementData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const storeAnnouncement = useStoreAnnouncement();
    return { storeAnnouncement };
  },
  created() {
    this.closeEdit();
  },
  methods: {
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
    openEdit() {
      this.editText = true;
    },
    closeEdit() {
      eventBus.on("editText", (editText) => {
        this.editText = editText;
      });
    },
  },
};
</script>

<style scoped>
.show-announcement {
  padding-bottom: 2vw;
  padding-left: 2vw;
  padding-right: 2vw;
}
.user-profile-image {
  width: 40px;
  height: 40px;
  margin-right: 1vw;
}
.announcement-text {
  text-align: left;
}
.delete-btn {
  margin-top: 1vw;
  margin-right: 1vw;
}
.edit-btn {
  margin-top: 1vw;
}
</style>
