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
    <nav id="nav" class="d-flex p-4 justify-content-between">
        <img src="@/assets/sp-icon.png" width="64" height="64" alt="" />
        <div class="menu-icon"><i class="d-block fa-solid fa-bars"></i></div>
    </nav>
</template>

<script>
let nav, body, content, scrollThreshold;

window.addEventListener("scroll", () => {
    if (window.scrollY >= scrollThreshold && !nav.classList.contains("fixed")) {
        nav.style.transition = "transform 0s";
        nav.style.transform = "translateY(-100%)";

        nav.classList.add("fixed");
        content.style.marginTop = `${nav.offsetHeight}px`;

        nav.style.transition = "transform 0.3s ease-out";
        nav.style.transform = "translateY(0%)";
    } else if (
        window.scrollY < scrollThreshold &&
        nav.classList.contains("fixed")
    ) {
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
    mounted() {
        nav = document.getElementById("nav");
        body = document.getElementsByTagName("body")[0];
        content = document.getElementById("web-container");
        scrollThreshold = nav.offsetHeight;
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
}

nav {
    a.router-link-exact-active {
        color: inherit !important;
    }

    li {
        font-size: 24px;
        padding: 0.3em;
    }

    .position-absolute {
        right: 1em;
        top: 0.5em;
    }
}

.menu-icon {
    font-size: 64px;
    height: auto;
}
</style>
