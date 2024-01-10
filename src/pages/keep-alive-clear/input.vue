<template>
  <div class="page_container">
    <div class="nav_bar">
      <span class="back_btn" @click="router.back()"> &lt; </span>
      <span class="nav_title">KeepAliveInputPage</span>
    </div>
    <div class="mgt_50">keywords：<input v-model="keywords" type="text" /></div>
    <div class="mgt_50">selectedResult：<input v-model="selectedRes" type="text" /></div>
    <div class="bb_btn mgt_50" @click="toSelect">toSelectPage</div>
  </div>
</template>
<script lang="ts">
export default {
  name: "KeepAliveInput",
};
</script>
<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { SimpleEvents, removeKeepAliveCache, resetKeepAliveCache } from "@/utils";

const router = useRouter();
const keywords = ref("");
const selectedRes = ref("");
const toSelect = () => {
  SimpleEvents.registerEvent("kKeepAliveInput", (data) => {
    selectedRes.value = data;
  });
  router.push("KeepAliveSelect");
};

const instance = getCurrentInstance()!;
onBeforeRouteLeave((to, from) => {
  console.log(String(to.name));
  if (["KeepAliveIndex"].includes(String(to.name))) {
    removeKeepAliveCache(instance);
  } else {
    resetKeepAliveCache(instance);
  }
});
</script>

<style scoped></style>

