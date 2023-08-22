<template>
  <div class="container show-user">
    <div class="user-profile">
      <img
        src="user-profile-image-url"
        class="user-profile-image rounded-circle"
      />
      <div class="user-info">
        <div class="user-name">{{ userData.name }} {{ userData.surname }}</div>
        <div class="username">{{ userData.username }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showUser",
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.show-user {
  margin-top: 2vw;
}
.user-profile {
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.user-profile-image {
  width: 40px;
  height: 40px;
  margin-right: 1vw;
}
.user-name {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}

.username {
  text-align: left;
  font-size: 14px;
  color: #888;
}
</style>
