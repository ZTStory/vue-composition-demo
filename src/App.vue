<script setup lang="ts">
import { excludes, GlobalData } from "@/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";
const include = ["Index", "Input"];

const router = useRouter();
const transitionMode = ref<"default" | "out-in" | "in-out">("default");

router.beforeEach((to, from) => {
    // 这里通过router中设置的页面深度depth来判断动画的方向，这样不会收到刷新和浏览器前进后退的影响而导致动画执行错误
    const toDepth = to.meta.depth as number;
    const fromDepth = from.meta.depth as number;
    if ((toDepth === 0 && fromDepth == void 0) || toDepth === fromDepth) {
        return true;
    }
    if (!from.name) {
        return true;
    }

    if (GlobalData.animationMode.value === "slide") {
        transitionMode.value = "default";
        to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    } else {
        transitionMode.value = "out-in";
        to.meta.transitionName = "animation";
    }

    return true;
});
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" :mode="transitionMode">
            <keep-alive :include="include" :exclude="excludes">
                <Component :is="Component" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<style>
@import "./assets/common.css";
@import "./assets/animation.css";

.page_container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    overflow-y: auto;
    background: #fff;
}

.page_container > * {
    flex-shrink: 0;
}
</style>
