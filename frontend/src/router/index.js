import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "WebWrapper",
        component: () => import("@/wrappers/WebWrapper.vue"),
        meta: {
            authRequired: false,
        },
        children: [
            {
                path: "",
                name: "HomeView",
                component: () => import("@/views/web/HomeView.vue"),
            },
            {
                path: "login",
                name: "LoginView",
                component: () => import("@/views/web/LoginView.vue"),
            },
            {
                path: "contact",
                name: "ContactView",
                component: () => import("@/views/web/ContactView"),
            },
            {
                path: "educators",
                name: "EducatorsView",
                component: () => import("@/views/web/EducatorsView"),
            },
            {
                path: "podcast",
                name: "PodcastView",
                component: () => import("@/views/web/PodcastView"),
            },
        ],
    },
    {
        path: "/",
        name: "AppWrapper",
        component: () => import("@/wrappers/AppWrapper.vue"),
        meta: {
            authRequired: true,
        },
        children: [
            {
                path: "newsfeed",
                name: "NewsfeedView",
                component: () => import("@/views/app/NewsfeedView.vue"),
            },
            {
                path: "search",
                name: "SearchView",
                component: () => import("@/views/app/SearchView.vue"),
            },
            {
                path: "my-profile",
                name: "MyProfileView",
                component: () => import("@/views/app/MyProfileView.vue"),
            },
            {
                path: "user-profile/:id",
                name: "UserProfileView",
                component: () => import("@/views/app/UserProfileView.vue"),
            },
            {
                path: "gallery",
                name: "GalleryView",
                component: () => import("@/views/app/GalleryView.vue"),
            },
            {
                path: "competitions",
                name: "CompetitionView",
                component: () => import("@/views/app/CompetitionView.vue"),
            },
        ],
    },
    {
        path: "/",
        name: "MsgWrapper",
        component: () => import("@/wrappers/MsgWrapper.vue"),
        children: [
            // {
            //     path: "login",
            //     name: "LoginView",
            //     component: () => import("@/views/LoginView.vue"),
            // },
            {
                path: "error",
                name: "Error",
                component: () => import("@/views/app/Error.vue"),
            },
            {
                path: "success",
                name: "Success",
                component: () => import("@/views/app/Success.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,

    // TODO Check if we can apply this globaly
    scrollBehavior(to, from, savedPosition) {
        return {
            top: -1,
        };
    },
});

router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem("token");
    const isUserLoggedIn = token !== null;

    // success and error
    let shouldRefresh = localStorage.getItem("shouldRefresh") === "true";
    if (shouldRefresh) {
        localStorage.removeItem("shouldRefresh");
        location.reload();
    }

    // provjera auth
    if (to.meta.authRequired) {
        if (!isUserLoggedIn) {
            return next({ name: "LoginView" });
        }
    } else {
        if (isUserLoggedIn) {
            if (to.name === "LoginView") {
                return next({ name: "NewsfeedView" });
            }
        }
    }

    return next();
});

export default router;
