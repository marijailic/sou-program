<!-- <template>
    <nav id="nav" class="navbar fixed-top navbar-expand-lg">
        <div class="d-flex justify-content-center collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/'"> Home </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'about'">
                        About
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'educators'">
                        Educators
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'podcast'">
                        Podcast
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'contact'">
                        Contact
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="text-start position-absolute">
            <i>Debug navbar </i><br />
            (<u><b>B</b></u
            >) to toggle borders <br />
            (<u><b>H</b></u
            >) to toggle navbar
        </div>
    </nav>
</template>
-->
<template>
    <nav id="nav" class="d-flex justify-content-between">
        <a class="inline-block" href="/">
            <img
                id="logo"
                :class="(navOpened ? 'opened' : '') + ' m-2'"
                src="@/assets/sp-icon.png"
                alt=""
            />
        </a>
        <div class="d-flex align-items-center">
            <div @click="navToggle" class="pl-5 menu-icon cursor-pointer">
                <Hamburger :type="1" class="float-end p-4" />
            </div>
        </div>
    </nav>
    <div :class="navOpened ? 'opened' : ''" id="nav-content">
        <div class="flex">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="/" class="nav-link"> Home </a>
                </li>
                <li class="nav-item">
                    <a href="/about" class="nav-link"> About </a>
                </li>
                <li class="nav-item">
                    <a href="/educators" class="nav-link"> Educators </a>
                </li>
                <li class="nav-item">
                    <a href="/podcast" class="nav-link"> Podcast </a>
                </li>
                <li class="nav-item">
                    <a href="/contact" class="nav-link"> Contact </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Hamburger from "./Hamburger.vue";

let nav, body, content, scrollThreshold, navContent, timeout, logo;

function toggleScroll() {
    if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "initial";
    } else {
        document.body.style.overflow = "hidden";
    }
}

function toggleNavOnScroll() {
    if (window.scrollY >= scrollThreshold && !nav.classList.contains("fixed")) {
        // When scrolled down
        nav.style.transition = "transform 0s";
        nav.style.transform = "translateY(-100%)";

        nav.classList.add("fixed");
        content.style.marginTop = `${1.333 * nav.offsetHeight}px`;

        nav.style.transition = "transform 0.3s ease-out";
        nav.style.transform = "translateY(0%)";
    } else if (
        window.scrollY < scrollThreshold &&
        nav.classList.contains("fixed")
    ) {
        // When on top
        nav.classList.remove("fixed");
        content.style.marginTop = 0;

        nav.style.transition = "transform 0s";
        nav.style.transform = "translateY(100%)";

        setTimeout(() => {
            nav.style.transition =
                "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1.11)";
            nav.style.transform = "translateY(0)";
        }, 10);
    }
}

const throttleTime = 10;
window.addEventListener("scroll", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        toggleNavOnScroll();
    }, throttleTime);
});

document.addEventListener("keypress", function (event) {
    if (event.key === "h") {
        nav.toggleAttribute("hidden");
    }
    if (event.key === "b") {
        body.classList.toggle("debugger-border");
    }
});

export default {
    data() {
        return {
            navOpened: false,
        };
    },
    components: {
        Hamburger,
    },
    mounted() {
        nav = document.getElementById("nav");
        body = document.getElementsByTagName("body")[0];
        content = document.getElementById("web-container");
        logo = document.getElementById("logo");
        scrollThreshold = nav.offsetHeight;
    },
    methods: {
        navToggle() {
            toggleScroll();
            this.navOpened = !this.navOpened;
            document.dispatchEvent(new Event("toggleNav"));
        },
    },
    name: "educatorCalendar",
};
</script>

<style lang="scss">
.debugger-border * {
    box-shadow: 0 0 0 1px red;
}
nav.fixed {
    position: fixed;
    left: 0;
    right: 0;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.menu-icon {
    scale: 0.7;
}

nav {
    position: relative;
    z-index: 2;
    transition: padding-top 1s;
    transition: padding-bottom 1s;
    padding: 2em 1em;
    background-color: var(--primary-color);

    #logo {
        height: 64px;
        width: 64px;
        border: 3px solid white;
        border-radius: 50%;
        transition: scale 0.3s;
    }

    #logo.opened {
        animation: rotate 1s ease-in-out;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }

    .position-absolute {
        right: 1em;
        top: 0.5em;
    }

    .menu-icon {
        z-index: 5;
        font-size: 64px;
        height: auto;
        cursor: pointer;
    }

    .close-nav {
        display: flex;
        align-items: flex-start;
        font-size: 64px;
        cursor: pointer;
    }
}

#nav-content {
    position: fixed;
    top: 100%;
    left: 0;
    background-color: var(--primary-color);
    color: white;
    transition: top 0.5s;
    height: 100vw;
    width: 100%;
    padding: 12em;
    z-index: 1;

    li {
        font-size: 24px;
        padding: 0.1em;

        a {
            display: inline-block;
            position: relative;
            font-size: 24px;
            border: 2px solid transparent;
            overflow: hidden;
        }

        a::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: -100%;
            width: 100%;
            height: 3px;
            background-color: white;
            transition: left 0.3s ease;
        }

        a:hover::after {
            left: 0;
        }
    }
}

#nav-content.opened {
    top: 0;
}
</style>
