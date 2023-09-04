<template>
    <div id="web-wrapper" class="d-flex flex-column">
        <div class="filler">&nbsp;</div>
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
    created() {
        const bodyStyles = window.getComputedStyle(document.body);
        if (
            bodyStyles.overflowX === "scroll" ||
            bodyStyles.overflowX === "visible"
        ) {
            console.log("Hello");
        }
    },
    components: {
        Navigation,
        SouFooter,
    },
};
</script>

<style lang="scss">
:root {
    --primary-color: rgb(100, 202, 255);
}
body {
    background-color: var(--primary-color);
}

#web-wrapper {
    background-color: white;
    min-height: 100vh;
}

.filler {
    position: absolute;
    height: 140px;
    width: 100%;
    background-color: var(--primary-color);
    z-index: 1;
}

#web-container {
    padding: 2em 8em;
    text-align: left;
    line-height: 20px;
    font-weight: 100;

    h1 {
        font-size: 4rem;
        padding: 0px 32px 64px 32px;
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
