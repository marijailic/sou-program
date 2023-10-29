<template>
    <div class="nav-container text-dark">
        <div class="card p-0 text-center d-flex gap-3 my-0 my-md-3">
            <div class="p-3">
                <img
                    class="nav-image rounded-circle mx-auto"
                    src="@/assets/sp-icon.png"
                />
                <h5 class="card-title mt-2 d-none d-md-block">
                    {{ username }}
                </h5>
            </div>
            <div class="card-body p-0 flex-grow-1">
                <nav class="nav flex-column">
                    <router-link
                        to="/newsfeed"
                        class="nav-link"
                        :class="{
                            'nav-link-active': isRouteActive('/newsfeed'),
                        }"
                        data-text="Naslovnica"
                        @click="toggleNav"
                    >
                        <i class="material-icons">article</i>
                    </router-link>
                    <router-link
                        to="/my-profile"
                        class="nav-link"
                        :class="{
                            'nav-link-active': isRouteActive('/my-profile'),
                        }"
                        data-text="Profil"
                        @click="toggleNav"
                    >
                        <i class="material-icons">person</i>
                    </router-link>
                    <router-link
                        to="/search"
                        class="nav-link"
                        :class="{ 'nav-link-active': isRouteActive('/search') }"
                        data-text="Stalkaonica"
                        @click="toggleNav"
                    >
                        <i class="material-icons">people</i>
                    </router-link>
                    <!-- <router-link
                        to="/gallery"
                        class="nav-link"
                        :class="{ 'nav-link-active': isRouteActive('/gallery') }"
                        data-text="Galerija"
                        @click="toggleNav"
                        ><i class="material-icons"
                            >photo_library</i
                        ></router-link
                    >
                    <router-link
                        to="/competitions"
                        class="nav-link"
                        :class="{
                            'nav-link-active': isRouteActive('/competitions'),
                        }"
                        data-text="Natjecanja"
                        @click="toggleNav"
                        ><i class="material-icons">emoji_events</i></router-link
                    > -->
                </nav>
            </div>
            <div class="pb-2 px-2">
                <div class="mb-2">
                    <router-link to="/resources" class="text-dark">
                        Resursi
                    </router-link>
                </div>
                <button class="btn btn-primary w-100" @click="logout">
                    Odjavi me
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';
import authService from '@/services/authService';

const props = {
    toggleNav: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'Navigation',
    props,
    data: () => ({
        username: '',
        storeUser: useStoreUser(),
    }),
    async created() {
        await this.storeUser.fetchUsers();
        const currentUser = await this.storeUser.getUserByUsername(
            authService.getAuthUsername()
        );

        this.username = currentUser.username;
    },
    methods: {
        isRouteActive(routeName) {
            return this.$route.path === routeName;
        },
        logout() {
            authService.deleteAuthData();
            window.location.href = '/login';
        },
    },
};
</script>

<style lang="scss" scoped>
.nav-container {
    height: 100vh;
    transform: translateX(-110%);
    transition: transform 0.3s ease-in-out;
    display: block;
    position: fixed;
    top: 0;
    overflow-y: auto;
    margin-left: 0;
    z-index: 1;
}

.slide-in {
    transform: translateX(0);
}

.nav-image {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
}

.card {
    height: calc(100vh - 4rem);
    border: solid 1px lightgray;
    border-radius: 0;
}

.nav-link {
    display: flex;
    align-items: center;
    color: var(--black-color);
    padding: 1rem;
    height: 3rem;

    &:hover {
        background-color: var(--white-color);
    }

    &::after {
        display: none;
        content: attr(data-text); // Display the text content
        margin-left: 0.5rem;
    }
}

.nav-link-active {
    background-color: var(--white-color);
}

.material-icons {
    width: 100%;
}

@media (min-width: 768px) {
    .nav-container {
        position: static;
        transform: translateX(0);
        width: 18rem;
        margin-left: 1rem;
    }

    .card {
        height: calc(100vh - 2rem);
        border: none;
        border-radius: 0.5rem;
    }

    .nav-image {
        width: 100px;
        height: 100px;
    }

    .nav-link::after {
        display: block;
    }

    .material-icons {
        width: auto;
    }
}
</style>
