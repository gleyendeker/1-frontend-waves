import { createApp } from "vue";
import App from "@/App.vue";
import Router from "@/router/router.js";

// Create the app
const app = createApp(App);

// use router
app.use(Router);

// mount
app.mount("#app");
