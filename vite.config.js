import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendAPI = import.meta.env.VITE_API_URL || "http://localhost:4000";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `${backendAPI}`,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
