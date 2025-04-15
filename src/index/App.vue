<script setup lang="ts">
import { getMainRouter, getSecondRouter } from "../utils";

const isSM = useMediaQuery("(min-width: 640px)");
const secondScreenPath = ref("");

watch(
  isSM,
  async (val) => {
    if (val) {
      // 从小屏幕 -> 大屏幕
      const mainRouter = getMainRouter();
      const currentRoute = mainRouter.currentRoute.value;
      if (currentRoute.meta.screen) {
        secondScreenPath.value = currentRoute.fullPath;
        await mainRouter.back();
      } else {
        secondScreenPath.value = "";
      }
    } else {
      // 从大屏幕 -> 小屏幕
      const mainRouter = getMainRouter();
      const secondRouter = getSecondRouter()!;
      if (secondRouter.currentRoute.value.meta.screen) {
        const currentRoute = secondRouter.currentRoute.value;
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
      :src="`./screen.html#${secondScreenPath}`"
    ></iframe>
  </div>
</template>
