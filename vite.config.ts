import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/vue-composition-demo/" : "/",
    build: {
        outDir: "dist",
    },
    plugins: [vue()],
    // 配置别名
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
