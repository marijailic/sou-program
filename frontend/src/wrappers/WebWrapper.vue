<template>
    <div id="web-wrapper" class="d-flex flex-column overflow-hidden">
        <div class="filler">&nbsp;</div>
        <div class="flex-grow-1">
            <Navigation />
            <router-view id="web-container"></router-view>
        </div>
        <SouFooter class="flex-shrink-0" />
    </div>
</template>

<script>
import Navigation from "@/components/web/Navigation.vue";
import SouFooter from "@/components/web/SouFooter.vue";

export default {
    name: "WebWrapper",
    created() {
        const bodyStyles = window.getComputedStyle(document.body);
        if (
            bodyStyles.overflowX === "scroll" ||
            bodyStyles.overflowX === "visible"
        ) {
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

@media (max-width: 1200px) {
    #web-container {
        padding: 2em 4em;

        h1 {
            font-size: 3.5rem;
        }
    }
}

@media (max-width: 1024px) {
    #web-container {
        padding: 2em 2em;
        font-size: 18px;
        line-height: 22px;

        h1 {
            font-size: 3rem;
        }

        h2 {
            font-size: 2.5rem;
        }

        h3 {
            font-size: 2.25rem;
        }

        h4 {
            font-size: 2rem;
        }
    }

    .filler {
        height: 96px;
    }
}

@media (max-width: 768px) {
    #web-container {
        padding: 2em 0em;
        line-height: 24px;
    }
}

@media (max-width: 480px) {
    #web-container {
        padding: 0.5em 0em;

        h1 {
            font-size: 2.5rem;
            padding: 10px;
        }

        h2 {
            font-size: 2.25rem;
        }

        h3 {
            font-size: 2rem;
        }

        h4 {
            font-size: 1.66rem;
        }
        h6 {
            margin-top: 1em;
        }
    }
}

/* Colors * /
@media (max-width: 1200px) {
    #web-container {
        background-color: yellow;
    }
}

@media (max-width: 1024px) {
    #web-container {
        background-color: orange;
    }
}

@media (max-width: 768px) {
    #web-container {
        background-color: red;
    }
}

@media (max-width: 480px) {
    #web-container {
        background-color: darkred;
    }
}*/
</style>
