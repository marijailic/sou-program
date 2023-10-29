<template>
    <div>
        <div class="card">
            <input
                type="text"
                class="form-control"
                placeholder="Upiši ime teme..."
                v-model="searchedTheme"
                @input="searchedResourcesByTheme(searchedTheme)"
            />
        </div>
    </div>
</template>

<script>
const props = {
    searchedResourcesByTheme: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'searchResource',
    props,
    data: () => ({ searchedTheme: '' }),
};
</script>
<style>
.card {
    border: none;
    padding: 1vw;
    margin-bottom: 1vw;
}
</style>
