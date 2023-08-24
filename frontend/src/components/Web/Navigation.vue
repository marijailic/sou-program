<template>
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
                    <router-link class="nav-link" :to="'Podcast'">
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

<script>
let nav, body;

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
    },
    name: "educatorCalendar",
};
</script>

<style lang="scss">
.debugger-border * {
    box-shadow: 0 0 0 1px red;
}

nav {
    background-color: lightskyblue;

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
</style>
