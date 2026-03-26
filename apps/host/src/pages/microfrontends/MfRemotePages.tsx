import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const RemotePosHealth = lazy(() => import("mfe_pos_health/RemoteApp"));
const RemoteCorporate = lazy(() => import("mfe_corporate/RemoteApp"));
const RemoteCommerces = lazy(() => import("mfe_commerces/RemoteApp"));
const RemoteLogin = lazy(() => import("mfe_login/RemoteApp"));
const RemoteDashboard = lazy(() => import("mfe_dashboard/RemoteApp"));

const MfFallback = () => (
  <div className="flex items-center gap-2 p-4 text-muted-foreground" role="status">
    <Loader2 className="size-5 animate-spin" aria-hidden />
    <span>Cargando sección…</span>
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
