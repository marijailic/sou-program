<template>
    <div class="success-msg">
        <h1>YAS! :)</h1>
        <button class="btn btn-primary mt-3" @click="goBack">
            Vrati me natrag
        </button>
    </div>
</template>

<script>
export default {
    name: "Success",
    methods: {
        goBack() {
            localStorage.setItem("shouldRefresh", true);
            window.history.back();
        },
    },
};
</script>

<style scoped>
.success-msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
