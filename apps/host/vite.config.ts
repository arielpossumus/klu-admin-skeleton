import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { withAppRootAlias } from "@klu/ui-kit/vite-aliases";
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const REMOTE_ENTRY = (port: number) => `http://localhost:${port}/remoteEntry.js`;

const repoRoot = path.resolve(__dirname, "../..");

const useSyncExternalStoreShim = path.resolve(
  __dirname,
  "./src/vite-shims/use-sync-external-store-shim.ts",
);

/**
 * Shell / host: app admin + Module Federation (remotos en dev por URL fija).
 * Variables `VITE_*`: `.env.*` en la raíz del monorepo (`envDir`). Cada MFE usa `.env.*` en su propia carpeta.
 */
export default defineConfig({
  envDir: repoRoot,
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      filename: "remoteEntry.js",
      dts: false,
      remotes: {
        mfe_login: {
          type: "module",
          name: "mfe_login",
          entry: REMOTE_ENTRY(5001),
          entryGlobalName: "mfe_login",
          shareScope: "default",
        },
        mfe_dashboard: {
          type: "module",
          name: "mfe_dashboard",
          entry: REMOTE_ENTRY(5005),
          entryGlobalName: "mfe_dashboard",
          shareScope: "default",
        },
        mfe_pos_health: {
          type: "module",
          name: "mfe_pos_health",
          entry: REMOTE_ENTRY(5002),
          entryGlobalName: "mfe_pos_health",
          shareScope: "default",
        },
        mfe_entity: {
          type: "module",
          name: "mfe_entity",
          entry: REMOTE_ENTRY(5003),
          entryGlobalName: "mfe_entity",
          shareScope: "default",
        },
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
    alias: [
      {
        find: "use-sync-external-store/shim",
        replacement: useSyncExternalStoreShim,
      },
      ...withAppRootAlias(path.resolve(__dirname, "./src")),
    ],
  },
  server: {
    port: 5000,
    origin: "http://localhost:5000",
  },
  build: {
    target: "chrome89",
  },
});
