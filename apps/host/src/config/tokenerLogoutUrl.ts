/**
 * URL de POST logout: debe leerse aquí (código del host) para que Vite sustituya `import.meta.env`.
 * No uses solo `resolveTokenerLogoutUrl()` desde `@klu/auth-session` en el bundle del host.
 */
const joinBaseAndPath = (base: string, path: string): string => {
  const b = base.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${b}/${p}`;
};

const fromEnv = (): string => {
  const base = (import.meta.env.VITE_TOKENER_BASE_URL as string | undefined)?.trim() ?? "";
  if (base === "") return "";
  const path =
    (import.meta.env.VITE_TOKENER_API_URL_LOGOUT as string | undefined)?.trim() ?? "oauth/logout";
  return joinBaseAndPath(base, path);
};

/** Fallback solo en dev si falta `.env` en la raíz del monorepo (`envDir` del host). */
const DEV_FALLBACK_LOGOUT = "https://dev-tokener.blumon-engineering.com/oauth/logout";

export const TOKENER_LOGOUT_URL: string = (() => {
  const u = fromEnv();
  if (u !== "") return u;
  if (import.meta.env.DEV) return DEV_FALLBACK_LOGOUT;
  return "";
})();
