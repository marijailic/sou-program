<template>
    <div>
        <div class="card p-0 border-0">
            <input
                type="text"
                class="form-control"
                placeholder="Upiši ime || prezime korisnika..."
                v-model="searchedUsername"
                @input="searchedUsersByUsername(searchedUsername)"
            />
        </div>
    </div>
</template>

<script>
const props = {
    searchedUsersByUsername: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'searchUser',
    props,
    data: () => ({ searchedUsername: '' }),
};
</script>
