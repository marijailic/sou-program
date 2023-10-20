<template>
    <div class="form-group">
        <label for="new-password">Lozinka</label>
        <input
            type="password"
            class="form-control"
            id="new-password"
            required
            v-model="password"
            @input="validatePassword"
        />
        <div class="error-msg" v-if="passwordErrors.length > 0">
            <span v-for="(error, index) in passwordErrors" :key="index">
                {{ error }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'passwordInput',
    data() {
        return {
            password: '',
            passwordErrors: [],
        }
    },
    methods: {
        validatePassword() {
            const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/
            const lengthRegex = /^.{8,}$/
            const uppercaseRegex = /[A-Z]/
            this.passwordErrors = []
            if (!uppercaseRegex.test(this.password)) {
                this.passwordErrors.push(
                    'Lozinka mora imati barem jedno veliko slovo.'
                )
            }
            if (!specialCharacterRegex.test(this.password)) {
                this.passwordErrors.push(
                    'Lozinka mora imati barem jedan poseban znak.'
                )
            }
            if (!lengthRegex.test(this.password)) {
                this.passwordErrors.push('Lozinka mora imati barem 8 znakova.')
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
