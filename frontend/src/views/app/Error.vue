<template>
    <div class="error-msg">
        <h1>NOPE! :(</h1>
        <button class="btn btn-primary mt-3" @click="goBack">
            Vrati me natrag
        </button>
    </div>
</template>

<script>
export default {
    name: "Error",
    methods: {
        goBack() {
            localStorage.setItem("shouldRefresh", true);
            window.history.back();
        },
    },
};
</script>

<style scoped>
.error-msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
