<template>
    <div
        class="modal fade full-screen-modal"
        tabindex="-1"
        :class="{ 'show d-block': isOpen }"
    >
        <button
            type="button"
            class="btn-close btn-close-top-left"
            @click="closeHandler"
        ></button>
        <div class="modal-dialog">
            <div class="modal-content border-0 shadow-sm">
                <div class="modal-body">
                    <h4 class="modal-title mt-sm-0 mt-4">{{ title }}</h4>
                    <form
                        class="card p-0 border-0 mt-3 d-flex gap-3"
                        @submit.prevent="confirmHandler"
                    >
                        <slot></slot>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="disabled"
                    >
                        Potvrdi
                    </button>
                </div>
            </div>
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
    methods: {
        closeHandler() {
            this.onClose()
        },
        confirmHandler() {
            this.onConfirm()
            this.closeHandler()
        },
    },
}
</script>

<style scoped>
.full-screen-modal {
    background: var(--white-color);
}

.btn-close-top-left {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1;
}
</style>
