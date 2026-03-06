"use client";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { TIME_PERIOD_OPTIONS, type TimePeriodOption } from "@/lib/utils";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BAR_CHART_CONFIG } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";
import ParagraphH4 from "../text/ParagraphH4";

const chartData = [
  { hour: "00:00", aprobadas: 0, rechazadas: 0 },
  { hour: "01:00", aprobadas: 0, rechazadas: 0 },
  { hour: "02:00", aprobadas: 0, rechazadas: 0 },
  { hour: "03:00", aprobadas: 0, rechazadas: 0 },
  { hour: "04:00", aprobadas: 0, rechazadas: 0 },
  { hour: "05:00", aprobadas: 6, rechazadas: 16 },
  { hour: "06:00", aprobadas: 0, rechazadas: 0 },
  { hour: "07:00", aprobadas: 0, rechazadas: 0 },
  { hour: "08:00", aprobadas: 0, rechazadas: 0 },
  { hour: "09:00", aprobadas: 0, rechazadas: 0 },
  { hour: "10:00", aprobadas: 0, rechazadas: 0 },
  { hour: "11:00", aprobadas: 0, rechazadas: 0 },
  { hour: "12:00", aprobadas: 0, rechazadas: 0 },
  { hour: "13:00", aprobadas: 0, rechazadas: 0 },
  { hour: "14:00", aprobadas: 0, rechazadas: 0 },
  { hour: "15:00", aprobadas: 0, rechazadas: 0 },
  { hour: "16:00", aprobadas: 0, rechazadas: 0 },
  { hour: "17:00", aprobadas: 0, rechazadas: 0 },
  { hour: "18:00", aprobadas: 0, rechazadas: 0 },
  { hour: "19:00", aprobadas: 0, rechazadas: 0 },
  { hour: "20:00", aprobadas: 0, rechazadas: 0 },
  { hour: "21:00", aprobadas: 0, rechazadas: 0 },
  { hour: "22:00", aprobadas: 0, rechazadas: 0 },
  { hour: "23:00", aprobadas: 0, rechazadas: 0 },
  { hour: "24:00", aprobadas: 0, rechazadas: 0 },
];

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
        <BarChart accessibilityLayer data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
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
