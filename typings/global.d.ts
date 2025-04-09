import { Router } from "vue-router";
import { showDialog } from "vant";

// 全局类型
declare global {
  interface Window {
    router: Router;
    showDialog: typeof showDialog;
  }
}
