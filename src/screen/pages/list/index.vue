<script setup lang="ts">
const list = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const router = useRouter();
const showDetail = (item: number) => {
  router.push({
    path: `/detail/${item}`,
  });
};
</script>

<template>
  <van-nav-bar title="列表页" />

  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="item in list"
      :key="item"
      :title="`id: ${item}`"
      value="查看详情"
      label="试试调整屏幕大小"
      @click="showDetail(item)"
    />
  </van-list>
</template>
