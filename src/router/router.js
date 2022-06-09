import { createWebHistory, createRouter } from "vue-router";
import theHome from "@/views/home-page.vue";
import theStatus from "@/views/wallet-status-page.vue";
import wavePage from "@/views/wave-page.vue";

const routes = [
  { path: "/", name: "home-page", component: theHome },
  { path: "/status", name: "status-page", component: theStatus },
  { path: "/wave", name: "wave-page", component: wavePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
