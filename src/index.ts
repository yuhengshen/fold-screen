import { createApp } from "vue";
import { setupShare } from "./share";
import App from "./index/App.vue";
import { showDialog } from "vant";
const app = createApp(App)

window.showDialog = showDialog;

setupShare(app)

app.mount("#app")
