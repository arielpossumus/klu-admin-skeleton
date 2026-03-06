import ParagraphH1 from "@/components/text/ParagraphH1";
import { SectionCards } from "@/components/commons/SectionCards";
import { Separator } from "@/components/ui/separator";
import { BarCharts } from "@/components/charts/BarCharts";
import getTrxValues from "../../../public/mockups/getTrxValues.json" with { type: "json" };

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
                    <BarCharts />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
