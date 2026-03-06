import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "@/pages/login/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminLayout from "@/layouts/AdminLayout";
import PosHealth from "@/pages/poshealt/PosHealth";

const routes = [
  { path: "/", Component: Login },
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
];

const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
