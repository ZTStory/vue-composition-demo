<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">KeepAliveSelectPage</span>
        </div>
        <div class="bb_btn mgt_50" @click="onBack">回调：123456</div>
    </div>
</template>
<script lang="ts">
export default {
    name: "KeepAliveSelect",
};
</script>
<script setup lang="ts">
import { SimpleEvents } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();
const onBack = () => {
    SimpleEvents.emit("kKeepAliveInput", "123456");
    router.back();
};
</script>

<style scoped></style>
