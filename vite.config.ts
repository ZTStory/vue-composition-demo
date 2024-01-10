import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import { createHtmlPlugin } from "vite-plugin-html";
// https://vitejs.dev/config/
const baseUrl = process.env.NODE_ENV === "production" ? "/vue-composition-demo/" : "/";

const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export default defineConfig({
  base: baseUrl,
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        sanitizeFileName(fileName) {
          const match = DRIVE_LETTER_REGEX.exec(fileName);
          const driveLetter = match ? match[0] : "";
          // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
          // Otherwise, avoid them because they can refer to NTFS alternate data streams.
          return driveLetter + fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
        },
      },
    },
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          title: "VueCompositionDemo",
          // injectScript: `<script type="module" src="${baseUrl}catch-script-load-error.js"></script>`,
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

