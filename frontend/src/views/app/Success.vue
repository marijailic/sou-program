<template>
    <div
        class="h-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1>YAS! :)</h1>
        <button class="btn btn-primary mt-3" @click="goBack">
            Vrati me natrag
        </button>
    </div>
</template>

<script>
import { keys, storage } from '@/services/storageService';

export default {
    name: 'Success',
    methods: {
        goBack() {
            storage.set(keys.SHOULD_REFRESH, true);
            window.history.back();
        },
    },
};
</script>

<style scoped>
.h-full {
    height: 100vh;
}
.btn-primary {
    background-color: #66ccff;
    border: #66ccff;
}
.btn-primary:hover {
    background-color: #66ccff;
}
.btn-primary:active {
    background-color: #66ccff !important;
}
.btn-primary:focus {
    background-color: #66ccff;
}
</style>
