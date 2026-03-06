import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/pages/login/Login";
import Components from "@/pages/components/Components";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminLayout from "@/layouts/AdminLayout";
import PosHealth from "@/pages/poshealt/PosHealth";
import CorporativoTop from "@/pages/corporativo/CorporativoTop";
import CorporativoListado from "@/pages/corporativo/CorporativoListado";

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
    path: "/poshealth",
    Component: AdminLayout,
    children: [{ index: true, Component: PosHealth }],
  },
  {
    path: "/corporativo",
    Component: AdminLayout,
    children: [
      { path: "top", Component: CorporativoTop },
      { path: "listado", Component: CorporativoListado },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
