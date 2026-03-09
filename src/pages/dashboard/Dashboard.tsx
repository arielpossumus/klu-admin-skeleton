import ParagraphH4 from "@/components/text/ParagraphH4";
import { SectionCards } from "@/components/commons/SectionCards";
import { Separator } from "@/components/ui/separator";
import { MovementsBarCharts } from "@/components/charts/MovementsBarCharts";
import getTrxValues from "../../../public/mockups/getTrxValues.json" with { type: "json" };
import graphDataJson from "../../../public/mockups/getAllTransactionsForGraph.json" with { type: "json" };
import panelInfoJson from "../../../public/mockups/getPanelInformation.json" with { type: "json" };
import incidentsJson from "../../../public/mockups/getAllPosIncidents.json" with { type: "json" };
import { AcceptancePieChart } from "@/components/charts/AcceptancePieChart";
import { PANEL_PIE_CHART_CONFIG } from "@/config/chart.config";
import { IncidentsBarChart } from "@/components/charts/IncidentsBarChart";

type GraphChartItem = { columnName: string; totalApproved: number; totalRejected: number; };
type GraphDataResponse = { chartData?: GraphChartItem[]; };

type PanelInfoResponse = {
    visaAcceptance?: number;
    mastercardAcceptance?: number;
    carnetAcceptance?: number;
    amexAcceptance?: number;
    otherBrandsAcceptance?: number;
};

const graphData = graphDataJson as GraphDataResponse;
const chartDataForBar = (graphData.chartData ?? []).map((item) => ({
    hour: item.columnName,
    aprobadas: item.totalApproved,
    rechazadas: item.totalRejected,
}));

const panelInfo = panelInfoJson as PanelInfoResponse;
const panelPieData = [
    { name: "visa", value: panelInfo.visaAcceptance ?? 0 },
    { name: "mastercard", value: panelInfo.mastercardAcceptance ?? 0 },
    { name: "carnet", value: panelInfo.carnetAcceptance ?? 0 },
    { name: "amex", value: panelInfo.amexAcceptance ?? 0 },
    { name: "otros", value: panelInfo.otherBrandsAcceptance ?? 0 },
];

type IncidentsResponse = {
    batteryIncidentsPercentage?: number;
    printerIncidentsPercentage?: number;
    connectionIncidentsPercentage?: number;
};

const incidents = incidentsJson as IncidentsResponse;
const incidentsData = [
    { categoria: "Batería", porcentaje: incidents.batteryIncidentsPercentage ?? 0 },
    { categoria: "Impresora", porcentaje: incidents.printerIncidentsPercentage ?? 0 },
    { categoria: "Conexión", porcentaje: incidents.connectionIncidentsPercentage ?? 0 },
];

const Dashboard = () => {
    const data = getTrxValues?.data_response?.MXN as { accumulatedAmountDay: number; salesNumber: number; rejectionNumber: number; transactionDailyNumber: number; };
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards accumulatedAmountDay={data.accumulatedAmountDay} salesNumber={data.salesNumber} rejectionNumber={data.rejectionNumber} transactionDailyNumber={data.transactionDailyNumber} />
                </div>
                <Separator />
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <MovementsBarCharts data={chartDataForBar} />
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:gap-6 md:py-6">
                    <div className="flex flex-col gap-4">
                        <ParagraphH4 text="Porcentaje de aceptacion" />
                        <AcceptancePieChart data={panelPieData} config={PANEL_PIE_CHART_CONFIG} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <ParagraphH4 text="Incidentes POS Health" />
                        <IncidentsBarChart data={incidentsData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
