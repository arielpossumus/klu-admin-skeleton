import path from "node:path";
import { fileURLToPath } from "node:url";

const uiKitPackageRoot = path.dirname(fileURLToPath(import.meta.url));

/** Raíz `packages/ui-kit/src` (componentes Shadcn, text, utils, hooks). */
export const uiKitSrcPath = path.join(uiKitPackageRoot, "src");

/** Alias para que `@/components/ui|text`, `@/lib/utils` y `@/hooks/use-mobile` apunten al kit. */
export const uiKitResolveAliases = [
  { find: "@/components/ui", replacement: path.join(uiKitSrcPath, "components/ui") },
  { find: "@/components/text", replacement: path.join(uiKitSrcPath, "components/text") },
  { find: "@/components/commons", replacement: path.join(uiKitSrcPath, "commons") },
  { find: "@/lib/utils", replacement: path.join(uiKitSrcPath, "lib/utils.ts") },
  { find: "@/hooks/use-mobile", replacement: path.join(uiKitSrcPath, "hooks/use-mobile.ts") },
];

/**
 * Alias del kit primero; el `@` del app debe ir **al final** para no pisar rutas del kit.
 * @param {string} appSrc
 */
export const withAppRootAlias = (appSrc) => [...uiKitResolveAliases, { find: "@", replacement: appSrc }];
