<template>
    <div class="side-navigation">
        <div class="card text-center">
            <img
                class="card-img-top rounded-circle mx-auto mt-3"
                src="@/assets/sp-icon.png"
            />
            <div class="card-body">
                <div class="card-title mt-1">
                    <router-link to="/my-profile">
                        <h5>{{ username }}</h5></router-link
                    >
                </div>
                <nav class="nav flex-column mt-4">
                    <router-link to="/newsfeed" class="nav-link"
                        ><i class="material-icons">article</i>
                        Newsfeed</router-link
                    >
                    <router-link to="/search" class="nav-link"
                        ><i class="material-icons">people</i> All
                        Users</router-link
                    >
                    <router-link to="/gallery" class="nav-link"
                        ><i class="material-icons">photo_library</i>
                        Gallery</router-link
                    >
                    <router-link to="/competitions" class="nav-link"
                        ><i class="material-icons">emoji_events</i>
                        Competitions</router-link
                    >
                </nav>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary btn-block">Welcome</button>
                <button class="btn btn-primary btn-block">Log Out</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "navigation",
    data() {
        return {
            username: "JohnDoe",
        };
    },
};
</script>

<style scoped>
.card {
    width: 100%;
    height: calc(100vh - 6vw);
    border: none;
}
.card-img-top {
    width: 100px;
    height: 100px;
}
.nav-link {
    display: flex;
    align-items: center;
}
</style>
