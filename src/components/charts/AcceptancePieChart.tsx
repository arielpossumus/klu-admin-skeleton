"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { RING_CHART_CONFIG } from "@/config/chart.config";
import { Cell, Pie, PieChart } from "recharts";

const defaultData = [
  { name: "aprobadas", value: 6, fill: "var(--color-aprobadas)" },
  { name: "rechazadas", value: 16, fill: "var(--color-rechazadas)" },
];

export type PieChartDataItem = { name: string; value: number; fill?: string; };

type PieChartComponentProps = {
  data?: PieChartDataItem[];
  config?: ChartConfig;
};

export function AcceptancePieChart({ data = defaultData, config = RING_CHART_CONFIG }: PieChartComponentProps) {
  const chartData = data.map((item) => ({
    ...item,
    fill: item.fill ?? `var(--color-${item.name})`,
  }));

  return (
    <ChartContainer config={config} className="mx-auto aspect-square h-[200px] w-full max-w-[200px]">
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={45}
          outerRadius={85}
          strokeWidth={0}
          paddingAngle={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}
