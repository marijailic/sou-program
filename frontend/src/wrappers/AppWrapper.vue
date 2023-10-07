<template>
    <div>
        <div class="main-container d-flex gap-3 p-3">
            <navigation
                :class="{ 'slide-in': menuOpen }"
                :toggleNav=toggleNav
            />
            <div class="w-100">
                <router-view></router-view>
            </div>
        </div>
        <div class="menu-footer">
            <i id="menu-button" class="material-icons p-3 text-white" @click="toggleNav">menu</i>
        </div>
    </div>
</template>

<script>
import navigation from "@/components/app/navigation.vue";
import eventBus from "@/eventBus";

export default {
    name: "AppWrapper",
    components: {
        navigation,
    },
    data: () => ({
        menuOpen: false,
    }),
    created() {
        eventBus.on("navClicked", this.toggleNav);
    },
    methods: {
        toggleNav(){
            this.menuOpen = !this.menuOpen;
        }
    }
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
.card {
    padding: 1rem;
}
.main-container {
    min-height: 100vh;
}
.menu-footer {
    position: sticky;
    bottom: 0;
    background-color: #66ccff;
    display: none;
    z-index: 2;

    @media (max-width: 768px)  {
        display: block;
    }
}
#menu-button {
    cursor: pointer;
}
</style>
