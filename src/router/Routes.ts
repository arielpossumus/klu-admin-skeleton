import Login from "@/pages/login/Index";
import AdminLayout from "@/layouts/AdminLayout";
import AdminLayoutNoHeader from "@/layouts/AdminLayoutNoHeader";
import Components from "@/pages/components/Components";
import Dashboard from "@/pages/dashboard/Index";
import PosHealth from "@/pages/poshealt/Index";
import PosHealthDetail from "@/pages/poshealt/PosHealthDetail";
import CorporateIndex from "@/pages/corporate/index";
import CorporateDetail from "@/pages/corporate/CorporateDetail";
import { AddCorporate } from "@/pages/corporate/AddCorporate";
import CommercesIndex from "@/pages/commerces/index";

export const routes = [
    { path: "/", Component: Login },
    {
        path: "/components",
        Component: AdminLayout,
        children: [{ index: true, Component: Components }],
    },
    {
        path: "/dashboard",
        Component: AdminLayoutNoHeader,
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
            { path: ":corporateId", Component: CorporateDetail },
            { path: "add-corporate", Component: AddCorporate },
        ],
    },
    {
        path: "/commerces",
        Component: AdminLayout,
        children: [
            { path: "physical", Component: CommercesIndex },
        ],
    },
];