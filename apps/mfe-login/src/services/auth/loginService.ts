import axios, { isAxiosError } from "axios";
import { API_URL_LOGIN, BASE_URL } from "@/config/constants";

const LOGIN_URL = `${BASE_URL}/${API_URL_LOGIN}`;
const AUTH_ME_URL = `${BASE_URL}/auth/me`;

export type DummyJsonLoginSuccess = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  role?: string;
};

export const loginService = {
  login: async (credentials: {
    username: string;
    password: string;
  }): Promise<DummyJsonLoginSuccess> => {
    try {
      const { data } = await axios.post<DummyJsonLoginSuccess>(
        LOGIN_URL,
        {
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 60,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (
        data.accessToken == null ||
        data.accessToken === "" ||
        data.refreshToken == null ||
        data.refreshToken === ""
      ) {
        throw new Error("Respuesta de login inválida");
      }

      let role: string | undefined;
      try {
        const { data: me } = await axios.get<{ role?: string }>(AUTH_ME_URL, {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        });
        if (typeof me.role === "string" && me.role.trim() !== "") {
          role = me.role.trim();
        }
      } catch {
        // Sin rol si /auth/me falla; el login sigue siendo válido.
      }

      return { ...data, role };
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const msg =
          (e.response?.data as { message?: string; } | undefined)?.message ??
          e.message;
        throw new Error(typeof msg === "string" ? msg : "Error al iniciar sesión");
      }
      throw e;
    }
  },
};
