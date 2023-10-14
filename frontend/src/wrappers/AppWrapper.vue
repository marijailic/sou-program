<template>
    <div @click="closeNav">
        <div class="w-full d-flex gap-3 p-3">
            <navigation
                :class="{ 'slide-in': isNavOpened }"
                :toggleNav="toggleNav"
                @click.stop
            />
            <div class="w-100">
                <router-view></router-view>
            </div>
        </div>
        <div class="menu-footer">
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
@import '@/assets/colors.scss';

html,
body {
    background-color: $white-color;
}
.btn-primary {
    background-color: $primary-color;
    border: $primary-color;
}
.btn-primary:hover {
    background-color: $primary-color;
}
.btn-primary:active {
    background-color: $primary-color !important;
}
.btn-primary:focus {
    background-color: $primary-color;
}
.w-full {
    min-height: 100vh;
}
.menu-footer {
    background-color: lightgray;
    position: sticky;
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
.icon {
    width: 4rem;
    height: 4rem;
}
.card {
    padding: 0.5rem;
}
</style>
