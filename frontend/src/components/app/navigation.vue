<template>
    <div class="nav-container">
        <div class="card text-center">
            <img
                id="profile-image"
                class="card-img-top rounded-circle mx-sm-auto mx-2"
                :src="userImageSrc || require('@/assets/sp-icon.png')"
            />
            <div class="card-body px-0">
                <h5 class="card-title mt-1">
                    <router-link class="custom-link" to="/my-profile">
                        {{ username }}</router-link
                    >
                </h5>
                <nav class="nav flex-column">
                    <router-link
                        to="/newsfeed"
                        class="nav-link"
                        data-text="Naslovnica"
                        @click="toggleNav"
                        ><i class="material-icons">article</i></router-link
                    >
                    <router-link
                        to="/search"
                        class="nav-link"
                        data-text="Stalkaonica"
                        @click="toggleNav"
                        ><i class="material-icons">people</i></router-link
                    >
                    <router-link
                        to="/gallery"
                        class="nav-link"
                        data-text="Galerija"
                        @click="toggleNav"
                        ><i class="material-icons"
                            >photo_library</i
                        ></router-link
                    >
                    <router-link
                        to="/competitions"
                        class="nav-link"
                        data-text="Natjecanja"
                        @click="toggleNav"
                        ><i class="material-icons">emoji_events</i></router-link
                    >
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
import { useStoreUser } from '@/stores/user.store'
import imageService from '@/services/imageService'

const props = {
    toggleNav: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'navigation',
    props,
    data: () => ({
        username: '',
        userImageSrc: '',
        storeUser: useStoreUser(),
    }),
    async created() {
        await this.storeUser.fetchUser()
        const currentUser = await this.storeUser.getCurrentUser()

        this.username = currentUser.username
        this.userImageSrc = await imageService.getImageSrc(
            currentUser.profile_picture_key
        )
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('username')
            localStorage.removeItem('type')
            window.location.href = '/login'
        },
    },
}
</script>

<style lang="scss" scoped>
.nav-container {
    height: 100vh;
    transform: translateX(-110%);
    transition: transform 0.3s ease-in-out;
    top: 0;
    left: 0;
    overflow-y: auto;
    display: block;
    position: fixed;
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
    color: #212529;
}
.nav {
    margin-top: 3rem;
}
.nav-link {
    display: flex;
    align-items: center;
    color: #212529;
    padding: 0;
    height: 3rem;

    &:hover {
        background-color: #f5f5f5;
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
    color: #212529;
}
.btn {
    width: 100%;
}

@media (min-width: 769px) {
    .nav-container {
        position: static;
        transform: translateX(0);
        width: 18rem;
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
