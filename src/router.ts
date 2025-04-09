import { createRouter, createWebHashHistory } from "vue-router";
import { getSecondRouter, isMainScreen } from "./utils";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: window.name === "main-screen" ? "/list" : "/empty",
    },
    {
      path: "/list",
      component: () => import("./screen/pages/list/index.vue"),
    },
    {
      path: "/detail/:id",
      component: () => import("./screen/pages/detail/index.vue"),
      props: true,
      meta: {
        // 可以转移到副屏幕
        screen: true,
      }
    },
    {
      path: "/empty",
      component: () => import("./screen/pages/empty/index.vue"),
    },
  ],
});

window.router = router;

router.beforeEach(async (to, from) => {
  /**
   * 当目标路由符合配置了 meta: true, 则代表其可以在副屏幕打开
   * 
   * 此时：
   * 如果是主屏幕，则跳转副屏幕打开
   * @param path 
   */
  if (to.meta.screen) {
    if (isMainScreen) {
      const router = getSecondRouter()
      if (router) {
        router.push(to.path);
        return false;
      }
    }
  }
});


export default router;
