<template>
    <div class="card">
        <div class="row">
            <div
                class="col-md-3 d-flex justify-content-center align-items-center"
            >
                <img
                    src="@/assets/sp-icon.png"
                    class="profile-pic rounded-circle"
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
