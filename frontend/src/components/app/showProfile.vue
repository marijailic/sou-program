<template>
    <div class="card">
        <div
            class="card-body d-flex flex-column flex-sm-row justify-content-sm-start justify-content-center align-items-center gap-3"
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
            <div>
                <h1 class="card-title">{{ user.fullName }}</h1>

                <p v-if="user.username && user.type">
                    {{ user.username }} - {{ user.type }}
                </p>
                <p>{{ user.email }}</p>
                <p>{{ user.bio }}</p>
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
