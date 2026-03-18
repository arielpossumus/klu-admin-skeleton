"use client";

import { useMemo } from "react";
import { Cell } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { BAR_COLORS, PANEL_PIE_CHART_CONFIG } from "@/config/chart.config";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { AcceptanceChartProps } from "@/types/dashboard/acceptanceChart";
import { Card } from "../ui/card";

export type { PieChartDataItem } from "@/types/dashboard/acceptanceChart";

function getBarFill(config: ChartConfig, name: string, index: number): string {
  const entry = config[name as keyof typeof config];
  const color =
    entry && typeof entry === "object" && "color" in entry
      ? (entry as { color?: string; }).color
      : undefined;
  return color ?? BAR_COLORS[index % BAR_COLORS.length];
}

export function AcceptanceChart({
  data,
  config = PANEL_PIE_CHART_CONFIG,
}: AcceptanceChartProps) {
  const chartData = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map((item) => ({
      name: item.name,
      label:
        (config[item.name as keyof typeof config] as { label?: string; })?.label ??
        item.name,
      value: total > 0 ? Math.round((item.value / total) * 100) : 0,
    }));
  }, [data, config]);

  return (
    <Card className="flex h-full flex-col p-4">
      <ChartContainer config={config} className="h-[360px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 8, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(v: number) => `${v}%`}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => `${value}%`}
          />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            barSize={56}
            label={({ x, y, width, value }) => (
              <text
                x={(x ?? 0) + (width ?? 0) / 2}
                y={(y ?? 0) - 6}
                textAnchor="middle"
                className="fill-muted-foreground text-xs font-medium"
              >
                {value}%
              </text>
            )}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarFill(config, entry.name, index)} />
            ))}
          </Bar>
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
