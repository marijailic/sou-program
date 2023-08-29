<template>
    <div class="side-navigation">
        <div class="card text-center">
            <img
                class="card-img-top rounded-circle mx-auto"
                src="@/assets/sp-icon.png"
            />
            <div class="card-body">
                <div class="card-title mt-1">
                    <router-link class="custom-link" to="/my-profile">
                        <h5>{{ username }}</h5></router-link
                    >
                </div>
                <nav class="nav flex-column">
                    <router-link to="/newsfeed" class="nav-link"
                        ><i class="material-icons">article</i>
                        Naslovnica</router-link
                    >
                    <router-link to="/search" class="nav-link"
                        ><i class="material-icons">people</i
                        >Stalkaonica</router-link
                    >
                    <router-link to="/gallery" class="nav-link"
                        ><i class="material-icons">photo_library</i>
                        Galerija</router-link
                    >
                    <router-link to="/competitions" class="nav-link"
                        ><i class="material-icons">emoji_events</i>
                        Natjecanja</router-link
                    >
                </nav>
            </div>
            <div class="nav-btns">
                <div class="info-link">
                    <a class="info-btn">Resursi</a>
                </div>
                <div>
                    <button class="btn btn-primary">Odjavi me</button>
                </div>
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
    height: calc(100vh - 4vw);
    border: none;
    padding-top: 2vw;
    padding-bottom: 2vw;
}
.card-img-top {
    width: 100px;
    height: 100px;
}
.card-body {
    padding-left: 0;
    padding-right: 0;
}
.custom-link {
    color: rgb(33, 37, 41);
}
.nav {
    margin-top: 3vw;
}
.nav-link {
    display: flex;
    align-items: center;
    color: rgb(33, 37, 41);
    padding: 0;
    height: 3vw;
}
.nav-link:hover {
    background-color: #f5f5f5;
}
.router-link-active {
    background-color: #f5f5f5;
}
.material-icons {
    margin-left: 1.2vw;
    margin-right: 0.5vw;
}
.nav-btns {
    padding-left: 0.5vw;
    padding-right: 0.5vw;
}
.info-link {
    margin-bottom: 0.5vw;
}
.info-btn {
    color: rgb(33, 37, 41);
}
.btn {
    width: 100%;
}
</style>
