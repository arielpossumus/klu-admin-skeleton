import ParagraphH4 from "@/components/text/ParagraphH4";
import SectionTitle from "@/components/text/SectionTitle";
import { MovementsChart } from "@/components/charts/MovementsCharts";
import getTrxValues from "../../../public/mockups/getTrxValues.json" with { type: "json" };
import panelInfoJson from "../../../public/mockups/dashboard/acceptance/getPanelInformation.json" with { type: "json" };
import incidentsJson from "../../../public/mockups/getAllPosIncidents.json" with { type: "json" };
import { AcceptanceChart } from "@/components/charts/AcceptanceChart";
import { PANEL_PIE_CHART_CONFIG } from "@/config/chart.config";
import { IncidentsBarChart } from "@/components/charts/IncidentsBarChart";
import { TopCorporativosChart } from "@/components/charts/TopCorporativosChart";
import { Card } from "@/components/ui/card";
import type { PanelInfoResponse } from "@/types/dashboard/PanelInfoResponse";
import type { IncidentsResponse } from "@/types/dashboard/IncidentsResponse";
import { CustomCard } from "@/components/commons/CustomCard";
import { DistributionListCard } from "@/components/commons/DistributionListCard";

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

    const data = getTrxValues?.data_response?.MXN as { accumulatedAmountDay: number; salesNumber: number; rejectionNumber: number; transactionDailyNumber: number; };
    const distributionItems = [
        { label: "Aprobadas", count: data.salesNumber },
        { label: "Rechazadas", count: data.rejectionNumber },
        { label: "Diarias", count: data.transactionDailyNumber },
        { label: "Acumulado", count: data.accumulatedAmountDay },
    ];
    return (
        <>
            <SectionTitle title="Dashboard" subtitle="Centro de control y estadísticas" />
            <div className="@container/main flex flex-1 flex-col gap-2">
                <CustomCard title="Transacciones">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-6">
                        <DistributionListCard items={distributionItems} />
                        <MovementsChart />
                    </div>
                </CustomCard >
            </div>

            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-6 md:py-6">
                <div className="flex h-full flex-col gap-4">
                    <Card className="flex h-full flex-col p-4">
                        <TopCorporativosChart />
                    </Card>
                </div>
                <div className="flex h-full flex-col gap-4">
                    <Card className="flex h-full flex-col p-4">
                        <ParagraphH4 text="Porcentaje de aceptacion" />
                        <AcceptanceChart data={panelPieData} config={PANEL_PIE_CHART_CONFIG} />
                    </Card>
                </div>
                <div className="flex h-full flex-col gap-4">
                    <Card className="flex h-full flex-col p-4">
                        <ParagraphH4 text="Incidentes POS Health" />
                        <IncidentsBarChart data={incidentsData} />
                    </Card>
                </div>

            </div>

        </>
    );
};

export default Dashboard;
