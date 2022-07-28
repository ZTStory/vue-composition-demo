<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">LastPositionIndexPage</span>
        </div>
        <div ref="scroll" class="flex_1 ofa w_100">
            <div v-for="(item, index) in items" :key="index" class="list_item" @click="toNext">{{ item }}</div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "LastPositionIndex",
};
</script>
<script setup lang="ts">
import { useLastPositon } from "@/use/useLastPosition";
import { removeKeepAliveCache, resetKeepAliveCache } from "@/utils";
import { getCurrentInstance, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

// 配置记录上次浏览位置
const scroll = ref();
useLastPositon(scroll);

const router = useRouter();
const items = Array.from({ length: 100 }, (v, i) => i + 1);
const toNext = () => {
    router.push("LastPositionNext");
};
const instance = getCurrentInstance()!;
onBeforeRouteLeave((to, from) => {
    console.log(String(to.name));
    if (["Home"].includes(String(to.name))) {
        removeKeepAliveCache(instance);
    } else {
        resetKeepAliveCache(instance);
    }
});
</script>

<style scoped>
.list_item {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e3e3e3;
    margin-left: 16px;
    width: calc(100% - 16px);
    color: #333;
    font-size: 15px;
}
</style>
