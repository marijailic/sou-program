<template>
  <div class="error-msg">
    <div class="msg-n-btn">
      <h1>NOPE! :(</h1>
      <button class="btn btn-primary mt-3" @click="goBack">
        Vrati me natrag
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
.error-msg {
  height: 100vh;
  display: flex;
  justify-content: center;
}
.msg-n-btn {
  align-self: center;
}
</style>
