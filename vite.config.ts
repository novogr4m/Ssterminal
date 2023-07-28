import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import { chromeExtension } from "./build/chromeExtension";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "*": resolve(""),
          },
    },
  plugins: [
    vue(),
    // 按需加载 ant-design-vue
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    process.env.BUILD_CRX && chromeExtension(),
  ].filter(Boolean),
});
