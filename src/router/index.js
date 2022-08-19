import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/view",
      name: "ViewEmployeeInfo",
      component: () => import("../views/ViewEmployeeInfo.vue")
    }
  ],
});

export default router;
