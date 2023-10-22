<template>
    <div
        class="modal fade full-screen-modal"
        tabindex="-1"
        :class="{ 'show d-block': isOpen }"
    >
        <button
            type="button"
            class="btn-close btn-close-top-left"
            @click="onClose"
        ></button>
        <div class="modal-dialog">
            <div class="modal-content border-0 shadow-sm">
                <form
                    class="card p-0 border-0 d-flex gap-3"
                    autocomplete="off"
                    @submit.prevent="confirmHandler"
                >
                    <div class="modal-body d-flex flex-column gap-3">
                        <h4 class="modal-title mt-sm-0 mt-4">{{ title }}</h4>
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">
                            Potvrdi
                        </button>
                    </div>
                </form>
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
    },
    methods: {
        confirmHandler() {
            this.onConfirm();
        },
    },
};
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

.not-allowed {
    cursor: not-allowed;
}
</style>
