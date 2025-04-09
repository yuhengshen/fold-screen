import { createApp } from "vue";
import { setupShare } from "./share";
import App from "./screen/App.vue";
import router from "./router";
const app = createApp(App)

setupShare(app)

app.use(router)

app.mount("#app")

window.top!.postMessage({
  type: "screen:ready",
});

