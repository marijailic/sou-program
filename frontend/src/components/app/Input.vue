<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <input
            class="form-control"
            :type="type"
            :value="modelValue"
            @input="updateValue"
        />

        <div class="error-msg" v-if="errorMessages.length > 0">
            <span v-for="(error, index) in errorMessages" :key="index">
                {{ error }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        validations: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: 'text',
        },
    },
    name: 'Input',
    data() {
        return {
            errorMessages: [],
        };
    },
    methods: {
        validateInput(value) {
            this.errorMessages = [];

            this.validations.forEach((validation) => {
                const result = validation(value);
                if (typeof result === 'string') {
                    this.errorMessages.push(result);
                }
            });

            this.$emit('validation', this.errorMessages.length === 0);
        },
        updateValue(event) {
            const value = event.target.value;
            this.validateInput(value.trim());
            this.$emit('update:modelValue', value);
        },
    },
};
</script>

<style scoped>
.error-msg {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--red-color);
    transition: opacity 0.3s;
}

.error-msg span {
    display: block;
}
</style>
