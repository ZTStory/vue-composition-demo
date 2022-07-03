<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">KeepAliveIndexPage</span>
        </div>
        <div class="bb_btn mgt_50" @click="toInput">toInputPage</div>
    </div>
</template>
<script lang="ts">
export default {
    name: "KeepAliveIndex",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const toInput = () => {
    router.push("KeepAliveInput");
};
</script>

<style scoped></style>
