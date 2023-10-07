<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "MsgWrapper",
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
    .btn-primary:focus {
        background-color: #66ccff;
    }
}
.w-full {
    min-height: 100vh;
}
</style>
