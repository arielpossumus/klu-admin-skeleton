import axios, { isAxiosError } from "axios";
import { API_URL_LOGIN, BASE_URL } from "@/config/constants";

const LOGIN_URL = `${BASE_URL}/${API_URL_LOGIN}`;

export type DummyJsonLoginSuccess = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
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
      return data;
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
