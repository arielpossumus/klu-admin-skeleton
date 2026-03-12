"use client";

import { Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { INCIDENTS_BAR_CHART_CONFIG, INCIDENT_COLORS } from "@/config/chart.config";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { IncidentsBarChartProps } from "@/types/dashboard/incidentsBarChart";

export type { IncidentDataItem } from "@/types/dashboard/incidentsBarChart";

export function IncidentsBarChart({ data }: IncidentsBarChartProps) {
  return (
    <ChartContainer config={INCIDENTS_BAR_CHART_CONFIG} className="h-[280px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 8, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="categoria" tickLine={false} axisLine={false} tickMargin={8} />
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
          dataKey="porcentaje"
          radius={[4, 4, 0, 0]}
          barSize={48}
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
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={INCIDENT_COLORS[index % INCIDENT_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
