<template>
    <div @click="closeNav">
        <div class="w-full d-flex">
            <div class="nav-wrapper">
                <Navigation
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
        <div class="menu-footer position-fixed w-100 p-1">
            <div class="d-flex h-100">
                <img
                    class="icon rounded-circle cursor-pointer align-self-center"
                    :src="require('@/assets/sp-icon.png')"
                    @click.stop="toggleNav"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/app/Navigation.vue';

export default {
    name: 'AppWrapper',
    components: {
        Navigation,
    },
    data: () => ({
        isNavOpened: false,
    }),
    methods: {
        toggleNav() {
            this.isNavOpened = !this.isNavOpened;
        },
        closeNav() {
            this.isNavOpened = false;
        },
    },
};
</script>

<style lang="scss">
:root {
    --primary-color: #66ccff;
    --white-color: #f5f5f5;
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

.btn-primary:disabled {
    background-color: var(--primary-color);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.w-full {
    min-height: 100vh;
}

.menu-footer {
    background-color: lightgray;
    bottom: 0;
    height: 4rem;
    display: none;
    z-index: 2;

    @media (max-width: 768px) {
        display: block;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.nav-wrapper {
    z-index: 2;
    left: 0;

    @media (min-width: 769px) {
        position: static;
        margin-top: 1rem;
    }
}

.main-content {
    padding-bottom: 4rem !important;

    @media (min-width: 769px) {
        margin-left: 19rem;
    }
}

.icon {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
}
</style>
