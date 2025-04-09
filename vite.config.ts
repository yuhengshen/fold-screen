import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.ts$/, /\.tsx$/],
      resolvers: [VantResolver()],
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true,
    }),
    Components({
      resolvers: [VantResolver()],
      dts: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        screen: "./screen.html",
      },
    },
  },
});
