<template>
  <div class="error-msg">
    <h1>NOPE! :(</h1>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
.error-msg {
  height: 100vh;
  display: flex;
  justify-content: center;
}
h1 {
  align-self: center;
}
</style>
