<template>
  <div class="page_container">
    模拟内嵌网页
    <div class="bb_btn mgt_50" @click="sendGoBack">返回上一页</div>
    <div class="bb_btn mgt_50" @click="sendGetLoginToken">获取登录Token</div>
    <div>Token：{{ loginToken }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "InnerPostMessagePromise",
};
</script>
<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import * as JSApi from "./jsbridge";

// 注册&卸载消息监听
JSApi.registerJSApiModule();
onUnmounted(() => {
  JSApi.deregisterJSApiModule();
});


const sendGoBack = () => {
  JSApi.goBack();
};

const loginToken = ref("--");
const sendGetLoginToken = async () => {
  if (loginToken.value === "获取中...") {
    return;
  }
  loginToken.value = "获取中..."
  const response = (await JSApi.getLoginToken()).response;
  loginToken.value = response.data.loginToken;
};
</script>

<style scoped></style>

