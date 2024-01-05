import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env file - without a prefix
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env": Object.keys(env).reduce((prev, key) => {
        prev[key] = env[key];
        return prev;
      }, {}),
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
      },
    },
    server: {
      open: true,
    },
    types: ["node", "vite/client"],
  };
});
