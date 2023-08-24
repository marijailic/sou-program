<template>
    <div>
        <!-- TODO Not for production -->
        <Navigation />
        <router-view id="app-web"></router-view>
    </div>
</template>

<script>
import Navigation from "@/components/Web/Navigation.vue";

export default {
    name: "WebWrapper",
    components: {
        Navigation,
    },
};
</script>

<style lang="scss">
#app-web {
    padding: 8em;
    text-align: left;
    line-height: 20px;

    h1 {
        font-size: 4rem;
        padding: 64px 32px;
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
        margin-top: 2em;
    }

    img {
        width: 100%;
    }
}
</style>
