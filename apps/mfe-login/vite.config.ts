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
      name: "mfe_login",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./RemoteApp": "./src/exposes/RemoteApp.tsx",
        "./LoginStyles": "./src/exposes/LoginStyles.ts",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: withAppRootAlias(path.resolve(__dirname, "./src")),
  },
  server: {
    port: 5001,
    origin: "http://localhost:5001",
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
