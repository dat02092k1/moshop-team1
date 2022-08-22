import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddMain from "../layouts/main/pages/AddMain.vue";
import UpdateMain from "../layouts/main/pages/UpdateMain.vue"
import Show3 from "../layouts/main/pages/Show3.vue";
import LoginMain from "../layouts/login/LoginMain.vue";
import ViewEmployeeInfo from "../views/ViewEmployeeInfo.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/staff/add",
      name: "staff.add",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../layouts/main/pages/AddMain.vue"),
      component: AddMain,
    },
    {
      path: "/staff/home",
      name: "staff.home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../layouts/main/pages/AddMain.vue"),
      // component: Show3
      component: () => import("../layouts/main/pages/Show3.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginMain,
    },
    {
      path: "/staff/add",
      name: "staff.add",
      component: AddMain,
    },
    {
      path: "/staff/:id",
      name: "staff.view",
      component: ViewEmployeeInfo,
    },
    {
      path: "/staff/update/:id",
      name: "staff.update",
      component: UpdateMain,
    },
  ],
});

export default router;
