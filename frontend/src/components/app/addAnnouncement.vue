<template>
    <div>
        <form @submit.prevent="postAnnouncement" class="card border-0 p-0 mt-3">
            <div class="d-flex gap-3 p-3">
                <div>
                    <img
                        class="profile-pic rounded-circle"
                        :src="
                            userProfilePictureSrc ||
                            require('@/assets/sp-icon.png')
                        "
                    />
                </div>
                <div class="flex-grow-1">
                    <textarea
                        v-model.trim="announcement.text"
                        class="form-control"
                        rows="3"
                        placeholder="Napiši obavijest..."
                        required
                    ></textarea>
                </div>
            </div>
            <div class="card-footer bg-white text-end">
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!announcement.text"
                >
                    Objavi
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreAnnouncement } from '@/stores/announcement.store';

const props = {
    userProfilePictureSrc: {
        type: String,
        required: true,
    },
};

export default {
    name: 'addAnnouncement',
    props,
    data: () => ({
        storeAnnouncement: useStoreAnnouncement(),
        announcement: {
            text: '',
        },
    }),
    methods: {
        async postAnnouncement() {
            await this.storeAnnouncement.createAnnouncement(this.announcement);
        },
    },
};
</script>

<style scoped>
.profile-pic {
    width: 50px;
    height: 50px;
}
</style>
