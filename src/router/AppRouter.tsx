import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/pages/login/Login";
import Components from "@/pages/components/Components";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminLayout from "@/layouts/AdminLayout";
import PosHealth from "@/pages/poshealt/PosHealth";
import PosHealthDetail from "@/pages/poshealt/PosHealthDetail";
import CorporateIndex from "@/pages/corporate/index";

const routes = [
  { path: "/", Component: Login },
  {
    path: "/components",
    Component: AdminLayout,
    children: [{ index: true, Component: Components }],
  },
  {
    path: "/dashboard",
    Component: AdminLayout,
    children: [{ index: true, Component: Dashboard }],
  },
  {
    path: "/pos-health",
    Component: AdminLayout,
    children: [
      { index: true, Component: PosHealth },
      { path: ":serialId", Component: PosHealthDetail },
    ],
  },
  {
    path: "/corporate",
    Component: AdminLayout,
    children: [
      { index: true, Component: CorporateIndex },

    ],
  },
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
