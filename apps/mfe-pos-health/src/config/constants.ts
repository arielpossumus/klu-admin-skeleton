export const ENVIROMENT = (import.meta.env.VITE_ENVIRONMENT as string) ?? "";
const normalizeBasePath = (value: string | undefined, fallback: string): string => {
  const raw = (value ?? "").trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

const normalizeApiSegment = (value: string | undefined, fallback: string): string => {
  const raw = (value ?? "").trim();
  if (!raw) return fallback;
  return raw.startsWith("/") ? raw.slice(1) : raw;
};

export const BASE_URL = normalizeBasePath(import.meta.env.VITE_BASE_URL as string, "/mockups/");
export const API_URL_ANEX = normalizeApiSegment(
  import.meta.env.VITE_API_URL_ANEX as string,
  "annex/",
);
/** Mock dispositivos POS en host: `mockups/pos/`. */
export const POS_API = normalizeApiSegment(import.meta.env.VITE_POS_API as string, "pos/");
export const CORPORATES_API = normalizeApiSegment(import.meta.env.VITE_CORPORATES_API as string, "corporates/");