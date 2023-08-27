<template>
    <div class="success-msg">
        <div class="msg-n-btn">
            <h1>YAS! :)</h1>
            <button class="btn btn-primary mt-3" @click="goBack">
                Vrati me natrag
            </button>
        </div>
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
    height: 100vh;
    display: flex;
    justify-content: center;
}
.msg-n-btn {
    align-self: center;
}
</style>
