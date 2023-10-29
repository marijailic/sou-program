<template>
    <div
        class="modal fade bg-white"
        tabindex="-1"
        :class="{ 'show d-block': isOpen }"
    >
        <button
            type="button"
            class="btn-close position-absolute z-1 top-0 end-0 m-3"
            @click="handleClose"
        ></button>
        <div class="modal-dialog mt-sm-5">
            <form
                class="modal-content d-flex flex-column gap-3 border-0 p-2"
                autocomplete="off"
                @submit.prevent="handleConfirm"
            >
                <div class="modal-body d-flex flex-column gap-3 p-0">
                    <h3 class="modal-title">{{ title }}</h3>
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
const props = {
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
};

export default {
    props,
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
    max-width: 80%;
    min-height: calc(100vh-4rem);
}

/* .btn-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
} */
</style>
