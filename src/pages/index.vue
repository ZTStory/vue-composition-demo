<template>
    <div class="page_container">
        <div class="nav_bar">IndexPage</div>
        <div class="bb_btn mgt_50" @click="toInput">toInputPage</div>
    </div>
</template>
<script lang="ts">
export default {
    name: "Index",
};
</script>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const toInput = () => {
    router.push("Input");
};
</script>

<style scoped></style>
