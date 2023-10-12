<template>
    <div>
        <div class="card mt-1 p-1 border-0">
            <div class="input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Upiši ime || prezime korisnika..."
                    v-model="searchText"
                    @input="filterUsers(searchText)"
                />
            </div>
        </div>
    </div>
</template>

<script>
const props = {
    filterUsers: {
        type: Function,
        required: true,
    },
}

export default {
    name: 'searchUser',
    props,
    data: () => ({ searchText: '' }),
}
</script>
