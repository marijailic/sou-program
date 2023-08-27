<template>
    <div class="main-container row">
        <div class="nav-container col">
            <navigation />
        </div>
        <div class="content-container col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import navigation from "@/components/navigation.vue";

export default {
    name: "AppWrapper",
    components: {
        navigation,
    },
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
.main-container {
    margin-left: 0;
    margin-right: 0;
}
.nav-container {
    width: 20vw;
    height: 100vh;
    position: fixed;
    padding-top: 3vw;
    padding-bottom: 3vw;
    padding-left: 2vw;
    padding-right: 2vw;
}
.content-container {
    margin-left: 20vw;
    padding-top: 3vw;
    padding-bottom: 3vw;
}
</style>
