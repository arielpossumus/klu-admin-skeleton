/**
 * Vite + Module Federation pueden resolver `use-sync-external-store/shim` como ESM
 * sobre el entry CJS del paquete, lo que rompe `import { useSyncExternalStore }`.
 * En React 18+ el hook vive en `react`.
 */
export { useSyncExternalStore } from "react";
