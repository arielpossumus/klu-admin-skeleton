import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { withAppRootAlias } from "@momentum/ui-kit/vite-aliases";
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repoRoot = path.resolve(__dirname, "../..");

export default defineConfig({
  envDir: repoRoot,
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "mfe_commerces",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./RemoteApp": "./src/exposes/RemoteApp.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
        "@tanstack/react-query": { singleton: true },
        "@tanstack/react-table": { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: withAppRootAlias(path.resolve(__dirname, "./src")),
  },
  server: {
    port: 5004,
    origin: "http://localhost:5004",
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
