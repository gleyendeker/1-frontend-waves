import { createWebHistory, createRouter } from "vue-router";
import theHome from "@/views/the-home.vue";
import theStatus from "@/views/the-status.vue";

const routes = [
  { path: "/", name: "home", component: theHome },
  { path: "/status", name: "status", component: theStatus }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
