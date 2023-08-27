<template>
    <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->

    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "AppWrapper",
};
</script>

<style lang="scss">
html,
body {
    background-color: #f5f5f5;
    .btn-primary {
        background-color: #66ccff;
        border: #66ccff;
    }
    .btn-primary:hover {
        background-color: #66ccff;
    }
    .btn-primary:active {
        background-color: #66ccff !important;
    }
}
</style>
