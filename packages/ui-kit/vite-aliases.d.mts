export interface ViteResolveAlias {
  find: string;
  replacement: string;
}

export const uiKitSrcPath: string;
/** Incluye `@/components/commons` → `packages/ui-kit/src/commons`. */
export const uiKitResolveAliases: ViteResolveAlias[];
export const withAppRootAlias: (appSrc: string) => ViteResolveAlias[];
