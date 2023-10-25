<template>
    <div class="card border-0">
        <div
            class="card-body d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 p-2"
        >
            <div>
                <img
                    class="profile-pic rounded-circle"
                    :src="
                        user.profilePictureSrc ||
                        require('@/assets/sp-icon.png')
                    "
                />
            </div>
            <div class="flex-grow-1 d-flex align-items-center">
                <div class="text-start">
                    <h1 class="card-title">
                        {{ user.fullName }}
                    </h1>
                    <p class="card-text" v-if="user.username && user.type">
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
};

export default {
    name: 'showProfile',
    props,
};
</script>

<style scoped>
.profile-pic {
    width: 9rem;
    height: 9rem;
    min-width: 9rem;
    min-height: 9rem;
}
</style>
