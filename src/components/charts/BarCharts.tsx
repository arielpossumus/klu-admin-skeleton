"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BAR_CHART_CONFIG, TIME_PERIOD_OPTIONS, type TimePeriodOption } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ParagraphH4 from "../text/ParagraphH4";
import graphDataJson from "../../../public/mockups/getAllTransactionsForGraph.json" with { type: "json" };

type GraphChartItem = { columnName: string; totalApproved: number; totalRejected: number };
type GraphDataResponse = { chartData?: GraphChartItem[] };

const graphData = graphDataJson as GraphDataResponse;
const chartDataFromApi = (graphData.chartData ?? []).map((item) => ({
  hour: item.columnName,
  aprobadas: item.totalApproved,
  rechazadas: item.totalRejected,
}));

export function BarCharts() {
  const [timePeriod, setTimePeriod] = useState<TimePeriodOption>("Anual");
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
              onClick={() => setTimePeriod(opt)}
            >
              {opt}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <ChartContainer config={BAR_CHART_CONFIG} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={chartDataFromApi} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis domain={[0, 16]} tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="aprobadas" fill="var(--color-aprobadas)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="rechazadas" fill="var(--color-rechazadas)" radius={[4, 4, 0, 0]} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </>

  );
}
