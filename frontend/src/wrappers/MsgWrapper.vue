<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'MsgWrapper',
}
</script>

<style lang="scss">
html,
body {
    background-color: var(--white-color);
    .btn-primary {
        background-color: var(--primary-color);
        border: var(--primary-color);
    }
    .btn-primary:hover {
        background-color: var(--primary-color);
    }
    .btn-primary:active {
        background-color: var(--primary-color) !important;
    }
    .btn-primary:focus {
        background-color: var(--primary-color);
    }
}
.w-full {
    min-height: 100vh;
}
</style>
