const joinBaseAndPath = (base: string, path: string): string => {
  const b = base.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${b}/${p}`;
};

const tokenerBase = (import.meta.env.VITE_TOKENER_BASE_URL as string | undefined)?.trim() ?? "";
const logoutPath =
  (import.meta.env.VITE_TOKENER_API_URL_LOGOUT as string | undefined)?.trim() ?? "oauth/logout";

/** URL absoluta POST /oauth/logout; vacía si no hay `VITE_TOKENER_BASE_URL` (solo se limpia sesión local). */
export const TOKENER_LOGOUT_URL =
  tokenerBase !== "" ? joinBaseAndPath(tokenerBase, logoutPath) : "";
