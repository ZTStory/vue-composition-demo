<template>
    <div class="page_container">
        <div class="nav_bar">
            <span class="back_btn" @click="router.back()"> &lt; </span>
            <span class="nav_title">LastPositionNextPage</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped></style>
