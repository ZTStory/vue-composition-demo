<template>
  <div class="page_container">
    <div class="nav_bar">
      <span class="back_btn" @click="router.back()"> &lt; </span>
      <span class="nav_title">PostMessagePromisePage</span>
    </div>
    <iframe id="iframe" :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
export default {
  name: "PostMessagePromise",
};
</script>
<script setup lang="ts">
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const iframeSrc = window.location.href + "/inner";

const sendMessage = (param: any) => {
  const iframe = document.getElementById("iframe") as HTMLIFrameElement | null;
  iframe?.contentWindow?.postMessage(param, "*");
};
const ActionMap: { [key: string]: (param?: any) => void } = {
  getLoginToken: (param: any) => {
    setTimeout(() => {
      sendMessage({
        ...param,
        response: {
          code: "0000",
          data: {
            loginToken: "123" + Math.random() * 1000,
          },
        },
      });
    }, 1000);
  },
  goBack: () => {
    router.back();
  },
};

const parentPostMessageEventHandle = (event: MessageEvent) => {
  const api = event.data.api as string;
  ActionMap[api]?.(event.data);
};
window.addEventListener("message", parentPostMessageEventHandle);
onUnmounted(() => {
  window.removeEventListener("message", parentPostMessageEventHandle);
});
</script>

<style scoped>
#iframe {
  width: 100%;
  flex: 1;
}
</style>

