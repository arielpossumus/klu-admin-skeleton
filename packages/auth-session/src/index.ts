import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const ACCESS_TOKEN_KEY = "klu_access_token";
export const REFRESH_TOKEN_KEY = "klu_refresh_token";
export const AUTH_PROFILE_KEY = "klu_auth_profile";
/** Hash SHA-256 (hex) enviado al login; el tokener lo exige de nuevo en POST /oauth/logout. */
export const OAUTH_PASSWORD_HASH_KEY = "klu_oauth_password_hash";

export type AuthProfile = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  /** Rol del usuario (p. ej. DummyJSON: `admin`, `moderator`, `user`). */
  role?: string;
};

const emitAuthChanged = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("klu:auth-changed"));
};

export const getAccessToken = (): string | null => {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

/** Token listo para `Authorization: Bearer` (trim, sin prefijo duplicado, 3 segmentos JWT). */
export const getBearerAccessToken = (): string | null => {
  const raw = getAccessToken();
  if (raw == null) return null;
  const t = raw.replace(/^Bearer\s+/i, "").trim();
  if (t === "") return null;
  const parts = t.split(".");
  if (parts.length !== 3) return null;
  return t;
};

export const getRefreshToken = (): string | null => {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getAuthProfile = (): AuthProfile | null => {
  if (typeof sessionStorage === "undefined") return null;
  const raw = sessionStorage.getItem(AUTH_PROFILE_KEY);
  if (raw == null || raw === "") return null;
  try {
    return JSON.parse(raw) as AuthProfile;
  } catch {
    return null;
  }
};

export const getOauthPasswordHash = (): string | null => {
  if (typeof sessionStorage === "undefined") return null;
  const v = sessionStorage.getItem(OAUTH_PASSWORD_HASH_KEY);
  if (v == null || v === "") return null;
  return v;
};

export const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const isAccessTokenValid = (skewSeconds = 30): boolean => {
  const token = getAccessToken();
  if (token == null || token === "") return false;
  const payload = decodeJwtPayload(token);
  if (payload == null) return false;
  const exp = payload.exp;
  if (typeof exp !== "number") return false;
  return exp > Date.now() / 1000 + skewSeconds;
};

export type AuthSessionPayload = {
  accessToken: string;
  refreshToken: string;
  profile?: AuthProfile | null;
  /** Mismo hash SHA-256 (hex) enviado en el login, para POST /oauth/logout del tokener. */
  oauthPasswordHash?: string | null;
};

export const setAuthSession = ({
  accessToken,
  refreshToken,
  profile,
  oauthPasswordHash,
}: AuthSessionPayload): void => {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (profile != null) {
    sessionStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
  } else {
    sessionStorage.removeItem(AUTH_PROFILE_KEY);
  }
  if (oauthPasswordHash != null && oauthPasswordHash !== "") {
    sessionStorage.setItem(OAUTH_PASSWORD_HASH_KEY, oauthPasswordHash);
  } else {
    sessionStorage.removeItem(OAUTH_PASSWORD_HASH_KEY);
  }
  emitAuthChanged();
};

export const clearAuthSession = (): void => {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_PROFILE_KEY);
  sessionStorage.removeItem(OAUTH_PASSWORD_HASH_KEY);
  emitAuthChanged();
};

export type AuthInterceptorOptions = {
  /** Ejecutado tras limpiar la sesión en 401 (p. ej. redirigir al login). */
  onUnauthorized?: () => void;
};

const defaultOnUnauthorized = (): void => {
  clearAuthSession();
  const base = import.meta.env.BASE_URL ?? "/";
  const path = base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;
  window.location.assign(path);
};

export const attachAuthInterceptors = (
  client: AxiosInstance,
  options?: AuthInterceptorOptions
): void => {
  const onUnauthorized = options?.onUnauthorized ?? defaultOnUnauthorized;

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token != null && token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (error: unknown) => {
      const status =
        error != null &&
        typeof error === "object" &&
        "response" in error &&
        error.response != null &&
        typeof error.response === "object" &&
        "status" in error.response
          ? (error.response as { status: number }).status
          : undefined;
      if (status === 401) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
};
