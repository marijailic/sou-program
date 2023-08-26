<template>
  <div>
    <div class="card">
      <div class="row">
        <div class="col-md-2 d-flex align-items-center justify-content-center">
          <img src="@/assets/sp-icon.png" class="profile-pic rounded-circle" />
        </div>
        <div class="col-md-10 d-flex align-items-center">
          <div class="card-body text-start">
            <h5 class="card-title">Marija Ilić</h5>
            <p class="card-text">{{ postData.text }}</p>
            <p class="card-text text-muted">DATUM</p>
            <div class="text-end">
              <button class="delete-btn btn btn-primary">Izbriši</button>
              <button class="edit-btn btn btn-primary">Uredi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showProfilePost",
  props: {
    postData: {
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
  margin-top: 1vw;
  margin-bottom: 1vw;
}
.profile-pic {
  width: 50px;
  height: 50px;
}
.delete-btn {
  margin-right: 1vw;
}
</style>
