import { postTokenerLogout } from "@klu/auth-session";
import { TOKENER_LOGOUT_URL } from "@/config/tokenerLogoutUrl";

export const callTokenerLogout = (): Promise<void> =>
  postTokenerLogout(TOKENER_LOGOUT_URL);
