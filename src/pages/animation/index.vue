<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">AnimationIndexPage</span>
        </div>
        <div class="bb_btn mgt_50" @click="changeAnimation">Change Animation：{{ GlobalData.animationMode }}</div>
    </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/utils";
import { useRouter } from "vue-router";
const router = useRouter();
const changeAnimation = () => {
    GlobalData.animationMode.value = GlobalData.animationMode.value === "slide" ? "animation" : "slide";
};
</script>

<style scoped></style>
