<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="input1"
        name="input1"
        label="input1"
        placeholder="input1"
        :rules="[{ required: true, message: '请填写input1' }]"
      />
      <van-field
        v-model="input2"
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
</template>
<script setup lang="ts">
import { ref } from "vue";

const input1 = ref("");
const input2 = ref("");
const onSubmit = (value: any) => {
  console.log("submit", value);
};
</script>
