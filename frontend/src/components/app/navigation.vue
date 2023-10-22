<template>
    <div class="nav-container">
        <div class="card py-3 text-center">
            <img
                id="profile-image"
                class="card-img-top rounded-circle mx-auto"
                :src="userProfilePictureSrc || require('@/assets/sp-icon.png')"
            />
            <div class="card-body px-0">
                <h5 class="card-title mt-1">
                    {{ username }}
                </h5>
                <nav class="nav flex-column">
                    <router-link
                        to="/newsfeed"
                        class="nav-link"
                        :class="{
                            'nav-link-active': isRouteActive('/newsfeed'),
                        }"
                        data-text="Naslovnica"
                        @click="toggleNav"
                        ><i class="material-icons">article</i></router-link
                    >
                    <router-link
                        class="nav-link"
                        to="/my-profile"
                        data-text="Profil"
                        @click="toggleNav"
                    >
                        <i class="material-icons">person</i></router-link
                    >
                    <router-link
                        to="/search"
                        class="nav-link"
                        :class="{ 'nav-link-active': isRouteActive('/search') }"
                        data-text="Stalkaonica"
                        @click="toggleNav"
                        ><i class="material-icons">people</i></router-link
                    >
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
            <div class="px-3">
                <div class="mb-2">
                    <router-link to="/resources" class="info-btn">
                        Resursi</router-link
                    >
                </div>
                <button class="btn btn-primary px-3" @click="logout">
                    Odjavi me
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreUser } from '@/stores/user.store';
import imageService from '@/services/imageService';
import authService from '@/services/authService';

const props = {
    toggleNav: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'navigation',
    props,
    data: () => ({
        username: '',
        userProfilePictureSrc: '',
        storeUser: useStoreUser(),
    }),
    async created() {
        await this.storeUser.fetchUsers();
        const currentUser = await this.storeUser.getUserByUsername(
            authService.getAuthUsername()
        );

        this.username = currentUser.username;
        this.userProfilePictureSrc = currentUser.profilePictureSrc;
    },
    methods: {
        isRouteActive(routeName) {
            return this.$route.path === routeName;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('type');
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

    z-index: 1;
    &.slide-in {
        transform: translateX(0);
    }
}
#profile-image {
    width: 60px;
    height: 60px;
}
.card-title {
    display: none;
}
.card {
    width: 100%;
    height: calc(100% - 56px);
    padding: 1rem 0;
}
.custom-link {
    color: var(--black-color);
}
.nav {
    margin-top: 3rem;
}
.nav-link-active {
    background-color: var(--white-color);
}
.nav-link {
    display: flex;
    align-items: center;
    color: var(--black-color);
    padding: 0;
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
.material-icons {
    margin-left: 1.2rem;
    margin-right: 0.5rem;
}
.info-btn {
    color: var(--black-color);
}
.btn {
    width: 100%;
}

@media (min-width: 769px) {
    .nav-container {
        position: static;
        transform: translateX(0);
        width: 18rem;
        margin-top: 1rem;
        margin-left: 1rem;
    }

    .card {
        border: none;
    }
    #profile-image {
        width: 100px;
        height: 100px;
    }
    .card-title {
        display: block;
    }
    .nav-link::after {
        display: block;
    }
}
</style>
