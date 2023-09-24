<template>
    <div class="card">
        <div class="row">
            <div
                class="col-md-3 d-flex justify-content-center align-items-center"
            >
                <img
                    v-if="profilePictureKey || userProfilePictureKey"
                    class="profile-pic rounded-circle"
                    :src="
                        parentComponent === 'MyProfileView'
                            ? profilePictureKey
                            : userProfilePictureKey
                    "
                />
                <img
                    v-else
                    class="profile-pic rounded-circle"
                    src="@/assets/sp-icon.png"
                />
            </div>
            <div class="second-col col-md-9 d-flex align-items-center">
                <div class="card-body text-start">
                    <h1 class="card-title">
                        {{ userData.name }} {{ userData.surname }}
                    </h1>
                    <p class="card-text">
                        {{ userData.username }} -
                        {{ userData.type }}
                    </p>
                    <p class="card-text">{{ userData.e_mail }}</p>
                    <p class="card-text">{{ userData.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "showProfile",
    props: {
        userData: {
            type: Object,
            required: true,
        },
        parentComponent: {
            type: String,
            required: true,
        },
        profilePictureKey: {
            type: String,
            required: false,
        },
        userProfilePictureKey: {
            type: String,
            required: false,
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
}
.profile-pic {
    width: 10vw;
    height: 10vw;
}
.second-col {
    padding-left: 0;
}
.card-body {
    padding-left: 0;
}
</style>
