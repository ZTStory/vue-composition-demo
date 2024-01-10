import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import { createHtmlPlugin } from "vite-plugin-html";
// https://vitejs.dev/config/
const baseUrl = process.env.NODE_ENV === "production" ? "/vue-composition-demo/" : "/";
export default defineConfig({
    base: baseUrl,
    build: {
        outDir: "dist",
    },
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: false,
            inject: {
                data: {
                    title: "VueCompositionDemo",
                    injectScript: `<script src="${baseUrl}catch-script-load-error.js"></script>`,
                },
                // tags: [
                //     {
                //         tag: "script",
                //         injectTo: "head",
                //         attrs: {
                //             src: "https://lzt.com/vue@3.2.47/dist/vue.global.prod.js",
                //         },
                //     },
                //     {
                //         tag: "script",
                //         injectTo: "head",
                //         attrs: {
                //             src: "https://lzt.com/naive-ui@2.34.3/dist/index.prod.js",
                //         },
                //     },
                // ],
            },
        }),
    ],
    // 配置别名
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
