import AdminLayout from "@/layouts/AdminLayout";
import AdminLayoutNoHeader from "@/layouts/AdminLayoutNoHeader";
import RootLayout from "@/layouts/RootLayout";
import { GuestOnlyRoute } from "@/components/auth/GuestOnlyRoute";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import {
  MfLoginPage,
  MfDashboardPage,
  MfPosHealthPage,
  MfEntityPage,
} from "@/pages/microfrontends/MfRemotePages";

export const routes = [
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: GuestOnlyRoute,
        children: [{ index: true, Component: MfLoginPage }],
      },
      {
        path: "/dashboard/*",
        Component: ProtectedRoute,
        children: [
          {
            path: "*",
            Component: AdminLayoutNoHeader,
            children: [{ path: "*", Component: MfDashboardPage }],
          },
        ],
      },
      {
        path: "/pos-health/*",
        Component: ProtectedRoute,
        children: [
          {
            path: "*",
            Component: AdminLayout,
            children: [{ path: "*", Component: MfPosHealthPage }],
          },
        ],
      },
      {
        path: "/corporate/*",
        Component: ProtectedRoute,
        children: [
          {
            path: "*",
            Component: AdminLayout,
            children: [{ path: "*", Component: MfEntityPage }],
          },
        ],
      },
      {
        path: "/commerces/*",
        Component: ProtectedRoute,
        children: [
          {
            path: "*",
            Component: AdminLayout,
            children: [{ path: "*", Component: MfEntityPage }],
          },
        ],
      },
    ],
  },
];
