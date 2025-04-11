import { createApp, createSSRApp } from "vue";
import { setupShare } from "./share";
import App from "./screen/App.vue";
import router from "./router";

const app = createApp(App)

setupShare(app)

app.use(router)

async function init() {
  await router.isReady()

  app.mount("#app")
}

init();
