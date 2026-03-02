import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/stm-api": {
        target: "https://api.stm.info",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/stm-api/, ""),
      },
    },
  },
});
