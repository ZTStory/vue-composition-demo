<template>
    <div class="page_container">
        <div class="nav_bar flex_none">
            <span class="nav_title">HomePage</span>
        </div>
        <div class="flex_1 ofa w_100">
            <div v-for="(item, index) in demoList" :key="index" class="list_item" @click="item.onClick">
                {{ item.title }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "Home",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
class DemoItem {
    constructor(public title: string, public onClick: () => void) {}
}

const demoList = [
    new DemoItem("Animation（过场动画）", () => {
        router.push("AnimationIndex");
    }),
    new DemoItem("KeepAliveClear（灵活清理页面缓存方案）", () => {
        router.push("KeepAliveIndex");
    }),
    new DemoItem("useLastPosition（记录列表浏览位置）", () => {
        router.push("LastPositionIndex");
    }),
    new DemoItem("usePaging（快捷分页模块，支持自定义）", () => {
        router.push("PagingIndex");
    }),
    new DemoItem("autoUpdate（纯前端检查代码是否更新）", () => {
        router.push("AutoUpdate");
    }),
    new DemoItem("postmessagePromise（Promise化通信方案）", () => {
        router.push("PostMessagePromise");
    }),
];
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
