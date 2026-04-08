import axios, { isAxiosError } from "axios";
import { API_URL_LOGIN, BASE_URL } from "@/config/constants";
import { sha256Hex } from "@/lib/sha256Hex";

const joinBaseAndPath = (base: string, path: string): string => {
  const b = base.replace(/\/$/, "");
  const p = path.replace(/^\//, "");
  return `${b}/${p}`;
};

const LOGIN_URL = joinBaseAndPath(BASE_URL, API_URL_LOGIN);

type OAuthTokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  userName?: string;
  userId?: number;
  country?: string;
};

type OAuthErrorBody = {
  error?: string;
  error_description?: string;
  message?: string;
};

export type LoginSuccess = {
  accessToken: string;
  refreshToken: string;
  userName: string;
  /** Hash SHA-256 (hex) enviado como `password` al tokener; se reutiliza en logout. */
  oauthPasswordHash: string;
};

const parseOAuthErrorMessage = (data: unknown): string | null => {
  if (data == null || typeof data !== "object") return null;
  const o = data as OAuthErrorBody;
  if (typeof o.error_description === "string" && o.error_description.trim() !== "") {
    return o.error_description.trim();
  }
  if (typeof o.error === "string" && o.error.trim() !== "") {
    return o.error.trim();
  }
  if (typeof o.message === "string" && o.message.trim() !== "") {
    return o.message.trim();
  }
  return null;
};

export const loginService = {
  login: async (credentials: {
    username: string;
    password: string;
  }): Promise<LoginSuccess> => {
    const passwordHash = await sha256Hex(credentials.password);

    const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID as string | undefined;
    const clientSecret = import.meta.env.VITE_OAUTH_CLIENT_SECRET as string | undefined;

    const params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", credentials.username);
    params.set("password", passwordHash);
    params.set("scope", "read write");

    if (clientId != null && clientId !== "" && (clientSecret == null || clientSecret === "")) {
      params.set("client_id", clientId);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (
      clientId != null &&
      clientId !== "" &&
      clientSecret != null &&
      clientSecret !== ""
    ) {
      headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
    }

    try {
      const { data } = await axios.post<OAuthTokenResponse>(LOGIN_URL, params.toString(), {
        headers,
      });

      if (
        data.access_token == null ||
        data.access_token === "" ||
        data.refresh_token == null ||
        data.refresh_token === ""
      ) {
        throw new Error("Respuesta de login inválida");
      }

      const userName =
        typeof data.userName === "string" && data.userName.trim() !== ""
          ? data.userName.trim()
          : credentials.username;

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        userName,
        oauthPasswordHash: passwordHash,
      };
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const fromBody = parseOAuthErrorMessage(e.response?.data);
        const msg = fromBody ?? e.message;
        throw new Error(msg !== "" ? msg : "Error al iniciar sesión");
      }
      throw e;
    }
  },
};
