<template>
    <div id="web-wrapper" class="d-flex flex-column">
        <div class="flex-grow-1">
            <!-- TODO Not for production -->
            <Navigation />
            <router-view id="web-container"></router-view>
        </div>
        <SouFooter class="flex-shrink-0" />
    </div>
</template>

<script>
import Navigation from "@/components/Web/Navigation.vue";
import SouFooter from "@/components/Web/SouFooter.vue";

export default {
    name: "WebWrapper",
    components: {
        Navigation,
        SouFooter,
    },
};
</script>

<style lang="scss">
#web-wrapper {
    min-height: 100vh;
}

#web-container {
    padding: 8em;
    text-align: left;
    line-height: 20px;
    font-weight: 100;

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
        font-weight: 100;
    }

    img {
        width: 100%;
    }

    .text-muted {
        font-size: 0.85em;
    }
}
</style>
