import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { withAppRootAlias } from "@klu/ui-kit/vite-aliases";
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  /** Variables `VITE_*` por app: `.env.*` en esta carpeta. */
  envDir: path.resolve(__dirname),
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
    /** Mock `commerceById.json` y demás viven en `apps/host/public`; con el host en :5000 el detalle resuelve `/mockups/*`. */
    proxy: {
      "/mockups": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "chrome89",
  },
});
