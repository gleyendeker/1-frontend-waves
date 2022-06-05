import App from "@/App.vue";
import { createApp } from "vue";
import Router from "@/router/router.js";
import Store from "@/store/store.js";

// Create the app
const app = createApp(App);

// use router
app.use(Router);

// use store
app.use(Store);

// mount
app.mount("#app");
