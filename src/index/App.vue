<script setup lang="ts">
import { getMainRouter, getSecondRouter } from "../utils";

const isSM = useMediaQuery("(min-width: 640px)");

watch(
  isSM,
  (val) => {
    if (val) {
      // 等待副屏幕 app 初始化完成
      window.addEventListener(
        "message",
        async (e) => {
          if (e.data.type === "screen:ready") {
            // 从小屏幕 -> 大屏幕
            const mainRouter = getMainRouter();
            const secondRouter = getSecondRouter();

            const currentRoute = mainRouter.currentRoute.value;
            if (currentRoute.meta.screen) {
              await mainRouter.back();
              await secondRouter.push(currentRoute.path);
            }
          }
        },
        { once: true }
      );
    } else {
      // 从大屏幕 -> 小屏幕
      const mainRouter = getMainRouter();
      const secondRouter = getSecondRouter();

      const currentRoute = secondRouter.currentRoute.value;
      if (currentRoute.meta.screen) {
        mainRouter.push(currentRoute.path);
      }
    }
  },
  {
    flush: "pre",
  }
);
</script>

<template>
  <div
    class="h-screen w-screen grid sm:grid-cols-2 overflow-hidden grid-cols-1 gap-2"
  >
    <iframe
      name="main-screen"
      class="w-full h-full"
      src="./screen.html"
    ></iframe>
    <iframe
      v-if="isSM"
      name="second-screen"
      class="w-full h-full"
      src="./screen.html"
    ></iframe>
  </div>
</template>
