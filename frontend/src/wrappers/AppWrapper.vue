<template>
    <div @click="closeNav">
        <div class="menu-footer position-sticky shadow-sm w-100 p-3">
            <div class="d-flex h-100">
                <img
                    class="menu-icon rounded-circle cursor-pointer align-self-center"
                    :src="require('@/assets/sp-icon.png')"
                    @click.stop="toggleNav"
                />
            </div>
        </div>
        <div class="h-full d-flex">
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
    --primary-color-light: #88ddff;
    --primary-bg-color: #f5f5f5;
    --white-color: #f5f5f5;
    --black-color: #212529;
    --black-outline-color: #515a66;
    --red-color: #dc3545;
    --menu-bg: #22729a;
    --dark-gray: #32292f;
}

html,
body {
    background-color: var(--white-color);
}

.btn-primary {
    background-color: var(--primary-color);
    border: var(--primary-color);
}

.btn-primary:focus,
.form-control:focus {
    box-shadow: 0 0 0 4px var(--primary-color-light) !important;
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
    opacity: 70%;
    background-color: var(--primary-color);
}

.btn-secondary,
.btn-secondary:focus,
.btn-secondary:active {
    background-color: var(--black-color) !important;
}

.btn-secondary:focus {
    box-shadow: 0 0 0 4px var(--black-outline-color) !important;
}

.h-full {
    min-height: 100vh;
}

.btn-delete,
.btn-delete:focus,
.btn-delete:hover,
.btn-delete:active {
    color: var(--red-color) !important;
}

.btn-delete:focus {
    border: 1px solid var(--red-color);
}

.btn-edit:focus {
    border: 1px solid var(--black-color);
}

.btn-delete,
.btn-edit {
    opacity: 70%;
}

.btn-edit:hover,
.btn-delete:hover {
    opacity: 100%;
}

.h-fit {
    height: fit-content;
}

.card {
    border: none;
    padding: 0;
}

.menu-footer {
    background-color: white;
    top: 0;
    display: none;
    z-index: 3;

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
    @media (min-width: 769px) {
        padding: 1rem !important;
        margin-left: 19rem;
    }
}

.icon {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
}

.menu-icon {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
}
</style>
