import AdminLayout from "@/layouts/AdminLayout";
import AdminLayoutNoHeader from "@/layouts/AdminLayoutNoHeader";

import {
  MfLoginPage,
  MfDashboardPage,
  MfPosHealthPage,
  MfCorporatePage,
  MfCommercesPage,
} from "@/pages/microfrontends/MfRemotePages";

export const routes = [
  { path: "/", Component: MfLoginPage },
  {
    path: "/dashboard/*",
    Component: AdminLayoutNoHeader,
    children: [{ path: "*", Component: MfDashboardPage }],
  },
  {
    path: "/pos-health/*",
    Component: AdminLayout,
    children: [{ path: "*", Component: MfPosHealthPage }],
  },
  {
    path: "/corporate/*",
    Component: AdminLayout,
    children: [{ path: "*", Component: MfCorporatePage }],
  },
  {
    path: "/commerces/*",
    Component: AdminLayout,
    children: [{ path: "*", Component: MfCommercesPage }],
  },
];
