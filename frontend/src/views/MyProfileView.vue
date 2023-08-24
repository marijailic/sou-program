<template>
  <div class="profile container">
    <show-profile :currentUserData="currentUserData" />
  </div>
</template>

<script>
import { useStoreUser } from "@/stores/user.store";

import showProfile from "@/components/showProfile.vue";

export default {
  name: "MyProfileView",
  components: { showProfile },
  data() {
    return {
      currentUserData: {},
    };
  },
  setup() {
    const currentUserUsername = localStorage.getItem("username");
    const storeUser = useStoreUser();

    return { storeUser, currentUserUsername };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      await this.storeUser.fetchUser();
      const currentUserData = await this.storeUser.getCurrentUser(
        this.currentUserUsername
      );
      this.currentUserData = currentUserData;
    },
  },
};
</script>

<style scoped>
.profile {
  margin-top: 3vw;
  margin-bottom: 3vw;
}
</style>
