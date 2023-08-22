<template>
    <div id="app-web">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "WebWrapper",
};
</script>

<style lang="scss">
#app-web {
    padding: 8em;
    text-align: left;
    line-height: 20px;

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 3rem;
    }

    h3 {
        font-size: 2.5rem;
    }

    h4 {
        font-size: 2rem;
    }

    h5 {
        font-size: 1.5rem;
    }

    h6 {
        font-size: 1.25rem;
    }
}
</style>
