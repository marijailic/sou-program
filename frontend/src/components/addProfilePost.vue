<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="col-md-2 d-flex align-items-center justify-content-center"
                >
                    <img
                        src="@/assets/sp-icon.png"
                        class="profile-pic rounded-circle"
                    />
                </div>
                <div class="col-md-10 d-flex align-items-center">
                    <div class="card-body text-start">
                        <textarea
                            v-model="announcementText"
                            class="form-control"
                            rows="3"
                            placeholder="Napiši obavijest..."
                        ></textarea>
                        <div class="text-end">
                            <button class="delete-btn btn btn-primary">
                                Izbriši
                            </button>
                            <button class="edit-btn btn btn-primary">
                                Uredi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

export default {
    name: "addProfilePost",
    props: {
        currentUserData: {
            type: Object,
            required: true,
        },
        postData: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatDate(strDate) {
            const objDate = new Date(strDate);
            const timeAgo = formatDistanceToNow(objDate);
            return timeAgo;
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
.delete-btn {
    margin-right: 1vw;
}
</style>
