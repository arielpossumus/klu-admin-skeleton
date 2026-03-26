import { BentoPanel } from "@/components/commons/BentoPanel";
import { ChartSpline } from "lucide-react";
import { MovementsChart } from "../charts/MovementsCharts";

export const MovementsGraphs = () => {
    const onShowMoreMovements = () => {
        console.log("Ver más movimientos");
    };
    return (
        <div className="lg:col-span-7 ">
            <BentoPanel className="bg-[var(--color-primary)]" title="Evolución de transacciones" icon={<ChartSpline className="size-4" aria-hidden />} showHeaderButton={true} headerButtonLabel="Ver transacciones" onHeaderButtonClick={onShowMoreMovements}>
                <div className="h-[460px] w-full min-w-0 text-foreground [&_.recharts-wrapper]:text-xs">
                    <MovementsChart />
                </div>
            </BentoPanel>
        </div>

    );
};