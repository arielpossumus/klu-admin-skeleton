const normalizeBasePath = (value: string | undefined, fallback: string): string => {
    const raw = (value ?? "").trim();
    if (!raw) return fallback;
    if (/^https?:\/\//i.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;
    const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
    return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

/** Segmento relativo tras `BASE_URL` (sin `/` inicial; con `/` final). Concatenar: `${BASE_URL}${USERS_API}archivo.json`. */
const normalizeApiSegment = (value: string | undefined, fallback: string): string => {
    const raw = (value ?? "").trim();
    const segment = !raw ? fallback : raw.startsWith("/") ? raw.slice(1) : raw;
    return segment.endsWith("/") ? segment : `${segment}/`;
};

/** Base de mocks/API (`VITE_BASE_URL` en `.env.localdev` / `.env.develop` / `.env.staging`). El `dev` del package usa `--mode localdev` para cargar `.env.localdev`. */
export const BASE_URL = normalizeBasePath(import.meta.env.VITE_BASE_URL as string, "/mockups/");
export const DASHBOARD_API = normalizeApiSegment(import.meta.env.VITE_DASHBOARD_API as string, "dashboard/");
export const ACCOUNT_API = normalizeApiSegment(import.meta.env.VITE_ACCOUNT_API as string, "accounts/");
export const USERS_API = normalizeApiSegment(import.meta.env.VITE_USERS_API as string, "users/");
export const ALERTS_API = normalizeApiSegment(import.meta.env.VITE_ALERTS_API as string, "alerts/");
export const FINANCES_API = normalizeApiSegment(import.meta.env.VITE_FINANCES_API as string, "finances/");
export const ACCEPTANCE_API = normalizeApiSegment(import.meta.env.VITE_ACCEPTANCE_API as string, "acceptance/");
/** Bajo `dashboard/` (mock POS incidentes en host: `mockups/dashboard/pos/`). */
export const DASHBOARD_POS_API = normalizeApiSegment(import.meta.env.VITE_DASHBOARD_POS_API as string, "pos/");
/** Bajo `dashboard/` (mock top corporativos: `mockups/dashboard/top/`). */
export const DASHBOARD_TOP_API = normalizeApiSegment(import.meta.env.VITE_DASHBOARD_TOP_API as string, "top/");
export const POS_HEALTH_API = normalizeApiSegment(import.meta.env.VITE_POS_HEALTH_API as string, "pos-health/");
/** Mock movimientos / listados en host: `mockups/transactions/`. */
export const TRANSACTIONS_API = normalizeApiSegment(import.meta.env.VITE_TRANSACTIONS_API as string, "transactions/");
