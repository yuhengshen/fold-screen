<script setup lang="ts">
import { showDialog } from "vant";
import { isMainScreen } from "../../../utils";
import Form from "./form.vue";

defineProps<{
  id: string;
}>();

const showDialog1 = () => {
  showDialog({
    title: "标题",
    message: "内容聚焦到当前屏幕",
  });
};

const showDialog2 = () => {
  window.top?.showDialog({
    title: "标题",
    message: "内容转移到大屏幕",
  });
};

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
  <div>
    <van-nav-bar
      title="详情"
      :left-text="isMainScreen ? '返回' : undefined"
      :left-arrow="isMainScreen"
      @click-left="goBack"
    />
    <div class="p-4 flex flex-col gap-2">
      详情页面: {{ id }}

      <van-button type="primary" @click="showDialog1">弹窗</van-button>
      <van-button type="primary" @click="showDialog2">全局弹窗</van-button>

      <Form />
    </div>
  </div>
</template>
