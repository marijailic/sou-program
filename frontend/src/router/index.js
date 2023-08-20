import { createRouter, createWebHistory } from "vue-router";
import WebsiteHome from "../views/WebsiteHomeView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: WebsiteHome,
    meta: {
      authRequired: false,
    },
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
    if (isUserLoggedIn) {
      if (to.name !== "NewsfeedView") {
        return next({ name: "NewsfeedView" });
      }
    } else {
      if (to.name !== "LoginView") {
        return next({ name: "LoginView" });
      }
    }
  } else {
    if (isUserLoggedIn) {
      if (to.name === "LoginView" || to.name === "HomeView") {
        return next({ name: "NewsfeedView" });
      }
    }
  }

  return next();
});

export default router;
