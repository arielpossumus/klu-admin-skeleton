import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const RemotePosHealth = lazy(() => import("mfe_pos_health/RemoteApp"));
const RemoteCorporate = lazy(() => import("mfe_corporate/RemoteApp"));
const RemoteCommerces = lazy(() => import("mfe_commerces/RemoteApp"));
const RemoteLogin = lazy(() => import("mfe_login/RemoteApp"));
const RemoteDashboard = lazy(() => import("mfe_dashboard/RemoteApp"));

const MfFallback = () => (
  <div
    className="flex min-h-svh w-full items-center justify-center text-muted-foreground"
    role="status"
    aria-live="polite"
    aria-label="Cargando sección"
  >
    <Loader2 className="size-10 animate-spin" aria-hidden />
    <span className="sr-only">Cargando sección…</span>
  </div>
);

export const MfPosHealthPage = () => (
  <Suspense fallback={<MfFallback />}>
    <RemotePosHealth />
  </Suspense>
);

export const MfLoginPage = () => (
  <Suspense fallback={<MfFallback />}>
    <RemoteLogin />
  </Suspense>
);

export const MfDashboardPage = () => (
  <Suspense fallback={<MfFallback />}>
    <RemoteDashboard />
  </Suspense>
);

export const MfCorporatePage = () => (
  <Suspense fallback={<MfFallback />}>
    <RemoteCorporate />
  </Suspense>
);

export const MfCommercesPage = () => (
  <Suspense fallback={<MfFallback />}>
    <RemoteCommerces />
  </Suspense>
);
