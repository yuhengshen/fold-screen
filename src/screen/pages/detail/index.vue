<script setup lang="ts">
import { isMainScreen } from "../../../utils";

const { id } = defineProps<{
  id: string;
}>();

const createDefaultDetailData = () => {
  return {
    showDialog: false,
    formData: {
      input1: "",
      input2: "",
    },
  };
};

/**
 * 不同的数据，需要绑定到不同的 sessionStorage 中
 *
 * 否则先点击 id 1，然后刷新页面，点击详情id 2。可能展示的是 id 1 的数据
 */
const detailData = useSessionStorage(
  () => `detail-${id}`,
  createDefaultDetailData()
);

// 在 useSessionStorage 之后执行
watch(
  () => id,
  () => {
    console.log("id changed", id);
    // id 变化了，说明详情内容变化了，需要重置表单，并清空非当前 id 的详情内容
    detailData.value = createDefaultDetailData();
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("detail-") && key !== `detail-${id}`) {
        sessionStorage.removeItem(key);
      }
    });
  }
);

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

const onSubmit = () => {
  console.log("submit", detailData.value.formData);
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
      详情页面ID: {{ id }}

      <van-button type="primary" @click="detailData.showDialog = true">
        弹窗
      </van-button>
      <van-button type="primary" @click="showDialog2">全局弹窗</van-button>

      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="detailData.formData.input1"
            name="input1"
            label="input1"
            placeholder="input1"
            :rules="[{ required: true, message: '请填写input1' }]"
          />
          <van-field
            v-model="detailData.formData.input2"
            name="input2"
            label="input2"
            placeholder="input2"
            :rules="[{ required: true, message: '请填写input2' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>

  <van-dialog
    v-model:show="detailData.showDialog"
    title="标题"
    show-cancel-button
  >
    <div class="flex flex-col gap-2 items-center">
      <div>屏幕内局部内容</div>
      <div>屏幕内局部内容</div>
      <div>屏幕内局部内容</div>
    </div>
  </van-dialog>
</template>
