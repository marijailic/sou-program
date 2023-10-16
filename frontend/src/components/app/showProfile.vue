<template>
    <div class="card p-3 border-0">
        <div
            class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3"
        >
            <img
                class="profile-pic rounded-circle"
                :src="user.profilePictureSrc || require('@/assets/sp-icon.png')"
            />
            <div class="flex-grow-1 d-flex align-items-center">
                <div class="text-start">
                    <h1 class="card-title">
                        {{ user.fullName }}
                    </h1>
                    <p class="card-text">
                        {{ user.username }} -
                        {{ user.type }}
                    </p>
                    <p class="card-text">{{ user.email }}</p>
                    <p class="card-text">{{ user.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const props = {
    user: {
        type: Object,
        required: true,
    },
}

export default {
    name: 'showProfile',
    props,
}
</script>

<style scoped>
.profile-pic {
    width: 10rem;
    height: 10rem;
}
</style>
