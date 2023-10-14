<template>
  <div class="form-group error" v-if="errorMessages.length > 0">
    <div>
      <div class="error-msg" v-for="message in errorMessages" :key="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "passwordErrors",
  props: {
    errorMessages: Array,
  },
  data() {},
};
</script>
  
  <style>
.error {
  color: red;
  background-color: #ffebeb;
  border: 1px solid red;
  border-radius: var(--bs-border-radius);
  width: 35.2vw;
  margin-left: 0.8vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.error-msg {
  padding: 0.5rem 0rem;
}
</style>