export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const API_URL_LOGIN = import.meta.env.VITE_API_URL_LOGIN as string;
export const API_URL_LOGOUT =
  (import.meta.env.VITE_API_URL_LOGOUT as string | undefined)?.trim() ?? "oauth/logout";

