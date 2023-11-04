<template>
    <div class="modal d-block" tabindex="-1" role="dialog">
        <div class="d-flex align-items-center h-full">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button
                            type="button"
                            class="btn-close"
                            @click="cancel"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <p>{{ message }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" @click="cancel">
                            Ne
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="confirm"
                        >
                            Da
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const props = {
    title: {
        type: String,
        default: 'Potvrdi',
    },
    message: {
        type: String,
        default: 'Jesi li siguran/na?',
    },
    onConfirm: {
        type: Function,
        default: () => {},
    },
    onCancel: {
        type: Function,
        default: () => {},
    },
};

export default {
    name: 'ConfirmationModal',
    props,
    methods: {
        confirm() {
            this.onConfirm();
        },
        cancel() {
            this.onCancel();
        },
    },
};
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.3);
}

.modal-dialog {
    width: 60ch !important;
}
</style>
