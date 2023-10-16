<template>
    <div @click="closeNav">
        <div class="w-full d-flex">
            <div id="nav">
                <navigation
                    class="position-fixed"
                    :class="{ 'slide-in': isNavOpened }"
                    :toggleNav="toggleNav"
                    @click.stop
                />
            </div>
            <div class="w-100 p-3 main-content">
                <router-view></router-view>
            </div>
        </div>
        <div class="menu-footer position-fixed w-100">
            <img
                id="menu-button"
                class="icon p-3 rounded-circle"
                :src="require('@/assets/sp-icon.png')"
                @click.stop="toggleNav"
            />
        </div>
    </div>
</template>

<script>
import navigation from '@/components/app/navigation.vue'

export default {
    name: 'AppWrapper',
    components: {
        navigation,
    },
    data: () => ({
        isNavOpened: false,
    }),
    methods: {
        toggleNav() {
            this.isNavOpened = !this.isNavOpened
        },
        closeNav() {
            this.isNavOpened = false
        },
    },
}
</script>

<style lang="scss">
:root {
    --primary-color: #66ccff;
    --white-color: #f5f5f5;
    --white-color-2: #eaeaea;
    --black-color: #212529;
    --red-color: #dc3545;
}

html,
body {
    background-color: var(--white-color);
}
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
.w-full {
    min-height: 100vh;
}

.menu-footer {
    background-color: lightgray;
    bottom: 0;
    display: none;
    z-index: 2;

    @media (max-width: 768px) {
        display: block;
    }
}
#menu-button {
    cursor: pointer;
}
#nav {
    z-index: 2;
    left: 0;

    @media (min-width: 769px) {
        position: static;
        margin-top: 1rem;
    }
}
.main-content {
    @media (min-width: 769px) {
        margin-left: 19rem;
    }
}
.icon {
    width: 4rem;
    height: 4rem;
}
.card {
    padding: 0.5rem;
}
</style>
