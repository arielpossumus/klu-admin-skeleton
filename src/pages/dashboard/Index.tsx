
import panelInfoJson from "../../../public/mockups/dashboard/acceptance/getPanelInformation.json" with { type: "json" };
import incidentsJson from "../../../public/mockups/getAllPosIncidents.json" with { type: "json" };
import { AcceptanceChart } from "@/components/charts/AcceptanceChart";
import { PANEL_PIE_CHART_CONFIG } from "@/config/chart.config";
import { IncidentsBarChart } from "@/components/charts/IncidentsBarChart";
import { TopCorporativosChart } from "@/components/charts/TopCorporativosChart";
import type { PanelInfoResponse } from "@/types/dashboard/PanelInfoResponse";
import type { IncidentsResponse } from "@/types/dashboard/IncidentsResponse";
import { BentoPanel } from "@/components/commons/BentoPanel";
import { DashboardProductShortcuts } from "@/components/bento/DashboardProductShortcuts";
import { RecentUsersBento } from "@/components/bento/RecentUsersBento";
import { WelcomeDashboard } from "@/components/bento/WelcomeDashboard";
import { ChartBarBig, ChartColumnBig } from "lucide-react";
import { Account } from "@/components/bento/Account";
import { Balance } from "@/components/bento/Balance";
import { DollarQuotes } from "@/components/bento/DollarQuotes";
import { MovementsGraphs } from "@/components/bento/MovementsGraphs";
import { Alerts } from "@/components/bento/Alerts";
import { LastMovements } from "@/components/bento/LastMovements";

const panelInfo = panelInfoJson as PanelInfoResponse;

const panelPieData = [
    { name: "visa", value: panelInfo.visaAcceptance ?? 0 },
    { name: "mastercard", value: panelInfo.mastercardAcceptance ?? 0 },
    { name: "carnet", value: panelInfo.carnetAcceptance ?? 0 },
    { name: "amex", value: panelInfo.amexAcceptance ?? 0 },
    { name: "otros", value: panelInfo.otherBrandsAcceptance ?? 0 },
];

const incidents = incidentsJson as IncidentsResponse;

const incidentsData = [
    { categoria: "Batería", porcentaje: incidents.batteryIncidentsPercentage ?? 0 },
    { categoria: "Impresora", porcentaje: incidents.printerIncidentsPercentage ?? 0 },
    { categoria: "Conexión", porcentaje: incidents.connectionIncidentsPercentage ?? 0 },
];




const Dashboard = () => {




    return (
        <>
            <div
                className="@container/main min-w-0 overflow-hidden rounded-none border-0 bg-[var(--color-primary-light)] p-5 text-white shadow-none md:p-8"
                role="region"
                aria-label="Panel principal home banking"
            >
                <WelcomeDashboard />

                <div className="grid auto-rows-min gap-4 lg:grid-cols-12 lg:gap-5">
                    <Balance />
                    <Account />
                    <DollarQuotes />
                    <MovementsGraphs />
                    <div className="flex min-h-0 flex-col gap-4 lg:col-span-5 lg:gap-5">
                        <DashboardProductShortcuts />
                        <Alerts />
                    </div>
                    <RecentUsersBento />
                    <LastMovements />
                    <div className="contents lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-5">
                        <div className="lg:col-span-4">
                            <BentoPanel
                                className="h-full text-foreground bg-[var(--color-dark)]"
                                title="Top corporativos"
                                icon={<ChartBarBig className="size-4" aria-hidden />}
                            >
                                <TopCorporativosChart />
                            </BentoPanel>
                        </div>
                        <div className="lg:col-span-4">
                            <BentoPanel
                                className="h-full text-foreground bg-[var(--color-dark-blue-foreground)]"
                                title="Porcentaje de aceptación"
                                icon={<ChartColumnBig className="size-4" aria-hidden />}
                            >
                                <AcceptanceChart data={panelPieData} config={PANEL_PIE_CHART_CONFIG} />
                            </BentoPanel>
                        </div>
                        <div className="lg:col-span-4">
                            <BentoPanel
                                className="h-full text-foreground"
                                title="Incidentes POS Health"
                                icon={<ChartColumnBig className="size-4" aria-hidden />}
                            >
                                <IncidentsBarChart data={incidentsData} />
                            </BentoPanel>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Dashboard;
