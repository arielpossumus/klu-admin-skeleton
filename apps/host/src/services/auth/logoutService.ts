import axios, { isAxiosError } from "axios";
import { getBearerAccessToken } from "@klu/auth-session";
import { TOKENER_LOGOUT_URL } from "@/config/tokener";

/**
 * POST al tokener: solo `Authorization: Bearer <JWT>`.
 * No envía Basic ni el hash en `password` (el backend lo interpretaba como token y fallaba el parseo JWT).
 */
export const callTokenerLogout = async (): Promise<void> => {
  if (TOKENER_LOGOUT_URL === "") return;

  const jwt = getBearerAccessToken();
  if (jwt == null) return;

  try {
    await axios.post(
      TOKENER_LOGOUT_URL,
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        timeout: 15_000,
      }
    );
  } catch (e: unknown) {
    if (isAxiosError(e) && e.code === "ERR_NETWORK") {
      return;
    }
    throw e;
  }
};
