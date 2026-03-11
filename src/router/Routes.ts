import Login from "@/pages/login/Login";
import AdminLayout from "@/layouts/AdminLayout";
import Components from "@/pages/components/Components";
import Dashboard from "@/pages/dashboard/Dashboard";
import PosHealth from "@/pages/poshealt/PosHealth";
import PosHealthDetail from "@/pages/poshealt/PosHealthDetail";
import CorporateIndex from "@/pages/corporate/index";

export const routes = [
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