<template>
  <div class="add-announcement">
    <form @submit.prevent="postAnnouncement">
      <div class="d-flex align-items-center">
        <img
          src="@/assets/sp-icon.png"
          class="user-profile-image rounded-circle"
        />
        <textarea
          v-model="announcementText"
          class="form-control"
          rows="3"
          placeholder="Napiši obavijest..."
        ></textarea>
      </div>
      <div class="post-btn d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Objavi</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoreAnnouncement } from "@/stores/announcement.store";
import { ref } from "vue";

export default {
  name: "addAnnouncement",
  data() {
    return {};
  },
  setup() {
    const storeAnnouncement = useStoreAnnouncement();

    const announcementText = ref("");

    const postAnnouncement = async () => {
      const text = announcementText.value;
      await storeAnnouncement.createAnnouncement(text);
    };

    return {
      storeAnnouncement,
      postAnnouncement,
      announcementText,
    };
  },
};
</script>

<style scoped>
.add-announcement {
  padding: 2vw;
}
.user-profile-image {
  width: 40px;
  height: 40px;
  margin-right: 1vw;
}
.post-btn {
  margin-top: 1vw;
}
</style>
