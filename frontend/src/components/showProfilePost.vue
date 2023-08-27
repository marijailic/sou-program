<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="first-col card-body col-md-1 d-flex justify-content-center"
                >
                    <img
                        src="@/assets/sp-icon.png"
                        class="profile-pic rounded-circle"
                    />
                </div>
                <div
                    class="second-col col-md-11 d-flex align-items-center text-start"
                >
                    <div class="card-right card-body text-start">
                        <h5 class="card-title d-inline m-0">
                            {{ currentUserData.name }}
                            {{ currentUserData.surname }}
                        </h5>
                        <span class="text-muted">
                            • {{ formatDate(postData.timestamp) }} ago
                        </span>
                        <p class="card-text mt-2">{{ postData.text }}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button class="delete-btn btn btn-primary">Izbriši</button>
                <button class="edit-btn btn btn-primary">Uredi</button>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

export default {
    name: "showProfilePost",
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
    padding: 0;
    margin-top: 1vw;
    margin-bottom: 1vw;
}
.row {
    padding: 1vw;
}
.second-col {
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.profile-pic {
    width: 50px;
    height: 50px;
}
.delete-btn {
    margin-right: 1vw;
}
</style>
