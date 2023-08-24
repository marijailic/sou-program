<template>
  <div class="card">
    <div class="row">
      <div class="col-md-4">
        <img src="@/assets/sp-icon.png" class="profile-pic rounded-circle" />
      </div>
      <div class="col-md-8 d-flex align-items-center">
        <div class="card-body text-start">
          <h1 class="card-title">
            {{ currentUserData.name }} {{ currentUserData.surname }}
          </h1>
          <p class="card-text">
            {{ currentUserData.username }} - {{ currentUserData.type }}
          </p>
          <p class="card-text">{{ currentUserData.e_mail }}</p>
          <p class="card-text">{{ currentUserData.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showProfile",
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  padding: 1vw;
}
.profile-pic {
  width: 250px;
  height: 250px;
}
</style>
