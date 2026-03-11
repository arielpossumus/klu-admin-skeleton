"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LINE_CHART_CONFIG } from "@/config/chart.config";
import { TIME_PERIOD_OPTIONS, type TimePeriodOption } from "@/config/options";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import ParagraphH4 from "../text/ParagraphH4";

import dataByYear from "../../../public/mockups/dashboard/movements/getAllTransactionsByYear.json" with { type: "json" };
import dataByMonth from "../../../public/mockups/dashboard/movements/getAllTransactionByMonth.json" with { type: "json" };
import dataByWeek from "../../../public/mockups/dashboard/movements/getAllTransactionsByWeek.json" with { type: "json" };
import dataByDay from "../../../public/mockups/dashboard/movements/getAllTransactionsByDay.json" with { type: "json" };
import EmptyCardLoader from "../loaders/EmptyCardLoader";
import type { MovementsResponse } from "@/types/dashboard/movementsChart";

const toLineData = (raw: MovementsResponse): { hour: string; aprobadas: number; rechazadas: number; }[] =>
  (raw?.chartData ?? []).map((item) => ({
    hour: item.columnName,
    aprobadas: item.totalApproved,
    rechazadas: item.totalRejected,
  }));

const DATA_SOURCE: Record<TimePeriodOption, MovementsResponse> = {
  Anual: dataByYear as MovementsResponse,
  Mensual: dataByMonth as MovementsResponse,
  Semanal: dataByWeek as MovementsResponse,
  Diario: dataByDay as MovementsResponse,
};

export type { LineChartDataItem } from "@/types/dashboard/movementsChart";

export function MovementsChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriodOption>("Anual");
  const [isLoading, setIsLoading] = useState(false);
  const chartData = useMemo(
    () => toLineData(DATA_SOURCE[timePeriod]),
    [timePeriod]
  );

  const OnChangeTimePeriod = (period: TimePeriodOption) => {
    setIsLoading(true);
    setTimePeriod(period);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <ParagraphH4 text="Movimientos" />
        <ButtonGroup>
          {TIME_PERIOD_OPTIONS.map((opt) => (
            <Button
              key={opt}
              variant={timePeriod === opt ? "default" : "outline"}
              size="sm"
              onClick={() => OnChangeTimePeriod(opt)}
            >
              {opt}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {isLoading ? (
        <EmptyCardLoader title={timePeriod} description="Cargando datos..." okIcon={false} />
      ) : (
        <ChartContainer config={LINE_CHART_CONFIG} className="h-[400px] w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, "auto"]} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="aprobadas"
              stroke="var(--color-aprobadas)"
              strokeWidth={2}
              dot={{ fill: "var(--color-aprobadas)", r: 3 }}
              name="aprobadas"
            />
            <Line
              type="monotone"
              dataKey="rechazadas"
              stroke="var(--color-rechazadas)"
              strokeWidth={2}
              dot={{ fill: "var(--color-rechazadas)", r: 3 }}
              name="rechazadas"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      )}
    </>
  );
}
