import { createRouter, createWebHistory } from "vue-router";
import WebsiteHome from "@/views/Web/HomeView.vue";
import WebWrapper from "@/WebWrapper.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: WebWrapper,
    meta: {
      authRequired: false,
    },
    children: [
      {
        path: "/",
        name: "HomeView",
        component: WebsiteHome,
      },
      {
        path: "about",
        name: "AboutUs",
        component: () => import("@/views/Web/AboutView"),
      },
    ],
  },
  {
    path: "/login",
    name: "LoginView",
    meta: {
      authRequired: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/error",
    name: "Error",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Error.vue"),
  },
  {
    path: "/success",
    name: "Success",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Success.vue"),
  },
  {
    path: "/newsfeed",
    name: "NewsfeedView",
    meta: {
      authRequired: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewsfeedView.vue"),
  },
  {
    path: "/search",
    name: "SearchView",
    meta: {
      authRequired: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SearchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const isUserLoggedIn = token !== null;

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
