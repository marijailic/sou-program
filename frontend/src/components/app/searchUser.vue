<template>
    <div>
        <div class="card border-0">
            <div class="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Upiši ime || prezime korisnika..."
                    v-model="searchText"
                    @input="emitSearchText"
                />
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "@/eventBus";

export default {
    name: "searchUser",
    data() {
        return { searchText: "" };
    },
    methods: {
        emitSearchText() {
            eventBus.emit("searchText", this.searchText);
        },
    },
};
</script>

<style scoped>
.card {
    padding: 1vw;
    margin-top: 1vw;
}
</style>
