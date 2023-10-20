<template>
    <div class="form-group">
        <label for="new-username">Korisničko ime</label>
        <input
            type="text"
            class="form-control"
            id="new-username"
            required
            v-model="username"
            @input="validateUsername"
            maxlength="16"
        />
        <div class="error-msg" v-if="usernameErrors.length > 0">
            <span v-for="(error, index) in usernameErrors" :key="index">
                {{ error }}
            </span>
        </div>
    </div>
</template>
  
  <script>
export default {
    name: 'usernameInput',
    data() {
        return {
            username: '',
            usernameErrors: [],
        }
    },
    methods: {
        containsWhitespace(str) {
            return /\s/.test(str)
        },
        validateUsername() {
            const alphanumericRegex = /^[a-zA-Z0-9._ ]+$/
            const repeatingCharactersRegex = /^([a-zA-Z0-9._])\1+$/

            this.usernameErrors = []
            if (this.containsWhitespace(this.username)) {
                this.usernameErrors.push(
                    'Korisničko ime ne može imati razmake.'
                )
            }
            if (repeatingCharactersRegex.test(this.username)) {
                this.usernameErrors.push(
                    'Korisničko ime ne može sadržavati samo ponavljajući isti znak.'
                )
            }
            if (this.username.length < 3) {
                this.usernameErrors.push(
                    'Korisničko ime ne može biti kraće od 3 znaka'
                )
            } else if (!alphanumericRegex.test(this.username)) {
                this.usernameErrors.push(
                    'Korisničko ime ne može sadržavati posebne znakove osim točke i podvlake.'
                )
            }
        },
    },
}
</script>
  
  <style>
.error-msg {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
    transition: opacity 0.3s;
}

.error-msg span {
    display: block;
}
</style>
  