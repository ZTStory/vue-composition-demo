<script setup lang="ts">
import { excludes } from "@/utils";
const include = ["Index", "Input"];
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="include" :exclude="excludes">
            <Component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<style>
.page_container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    overflow-y: auto;
    background: #fff;
}

.page_container > * {
    flex-shrink: 0;
}

.bb_btn {
    height: 44px;
    line-height: 44px;
    background: linear-gradient(137deg, #0fda84 0%, #00ba6c 100%);
    border-radius: 4px;
    font-size: 17px;
    text-align: center;
    color: #fff;
    width: 80%;
}

.nav_bar {
    width: 100%;
    height: 44px;
    background-color: #00ba6c;
    color: #fff;
    text-align: center;
    font-weight: bold;
    line-height: 44px;
}

.mgt_50 {
    margin-top: 50px;
}
</style>
