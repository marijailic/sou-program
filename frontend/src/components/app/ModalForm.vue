<template>
    <div
        class="modal fade bg-white"
        tabindex="-1"
        :class="{ 'show d-block': isOpen }"
    >
        <button type="button" class="btn-close" @click="handleClose"></button>
        <div class="modal-dialog">
            <form
                class="p-0 d-flex flex-column gap-3 modal-content border-0"
                autocomplete="off"
                @submit.prevent="handleConfirm"
            >
                <div class="modal-body d-flex flex-column gap-3 p-0">
                    <h3 class="modal-title mt-sm-0 mt-4">{{ title }}</h3>
                    <slot></slot>
                </div>
                <div class="modal-footer border-0 p-0">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="disabled"
                    >
                        Potvrdi
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Modal Title',
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        onClose: {
            type: Function,
            default: () => {},
        },
        onConfirm: {
            type: Function,
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isDisabled: this.disabled,
        };
    },
    created() {
        document.body.style.overflow = 'hidden';
    },
    methods: {
        handleConfirm() {
            this.onConfirm();
        },
        handleClose() {
            document.body.style.overflow = '';
            this.onClose();
        },
    },
};
</script>

<style scoped>
.modal-dialog {
    margin-top: 6rem !important;
    max-width: 35rem;
}

.btn-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
}
</style>
