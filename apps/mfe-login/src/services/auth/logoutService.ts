import axios, { isAxiosError } from "axios";
import { clearAuthSession, getBearerAccessToken } from "@klu/auth-session";
import { API_URL_LOGOUT, BASE_URL } from "@/config/constants";

const joinBaseAndPath = (base: string, path: string): string => {
  const b = base.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${b}/${p}`;
};

const LOGOUT_URL = joinBaseAndPath(BASE_URL, API_URL_LOGOUT);

/**
 * POST a `VITE_BASE_URL`/`VITE_API_URL_LOGOUT` solo si hay JWT válido: `Authorization: Bearer`.
 * No usa Basic (el tokener lo trataba como token y respondía "no tiene formato de JWT").
 * Siempre limpia la sesión local al final.
 */
export const logoutService = {
  notifyTokenerAndClearLocal: async (): Promise<void> => {
    const jwt = getBearerAccessToken();

    try {
      if (jwt != null) {
        await axios.post(LOGOUT_URL, null, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          timeout: 15_000,
        });
      }
    } catch (e: unknown) {
      if (isAxiosError(e) && e.code === "ERR_NETWORK") {
        // Sin red: seguimos y limpiamos sesión local.
      }
    } finally {
      clearAuthSession();
    }
  },
};
