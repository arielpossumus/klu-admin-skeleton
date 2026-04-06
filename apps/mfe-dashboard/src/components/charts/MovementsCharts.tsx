"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import EmptyCardLoader from "../loaders/EmptyCardLoader";
import type { MovementsResponse } from "@/types/dashboard/movementsChart";
import { getAllTransactionsByDay } from "@/services/transactions/getAllTransactionsByDay";
import { getAllTransactionsByMonth } from "@/services/transactions/getAllTransactionsByMonth";
import { getAllTransactionsByWeek } from "@/services/transactions/getAllTransactionsByWeek";
import { getAllTransactionsByYear } from "@/services/transactions/getAllTransactionsByYear";
import { Card } from "@/components/ui/card";

const toLineData = (raw: MovementsResponse): { hour: string; aprobadas: number; rechazadas: number; }[] =>
  (raw?.chartData ?? []).map((item) => ({
    hour: item.columnName,
    aprobadas: item.totalApproved,
    rechazadas: item.totalRejected,
  }));

export type { LineChartDataItem } from "@/types/dashboard/movementsChart";

export function MovementsChart() {
  const [timePeriod, setTimePeriod] = useState<TimePeriodOption>("Anual");

  const yearQ = useQuery({
    queryKey: ["dashboard", "movementsTransactions", "year"],
    queryFn: getAllTransactionsByYear,
  });
  const monthQ = useQuery({
    queryKey: ["dashboard", "movementsTransactions", "month"],
    queryFn: getAllTransactionsByMonth,
  });
  const weekQ = useQuery({
    queryKey: ["dashboard", "movementsTransactions", "week"],
    queryFn: getAllTransactionsByWeek,
  });
  const dayQ = useQuery({
    queryKey: ["dashboard", "movementsTransactions", "day"],
    queryFn: getAllTransactionsByDay,
  });

  const loadingByPeriod = {
    Anual: yearQ.isPending || yearQ.isFetching,
    Mensual: monthQ.isPending || monthQ.isFetching,
    Semanal: weekQ.isPending || weekQ.isFetching,
    Diario: dayQ.isPending || dayQ.isFetching,
  } as const;

  const chartData = useMemo(() => {
    const src: MovementsResponse | undefined =
      timePeriod === "Anual"
        ? yearQ.data
        : timePeriod === "Mensual"
          ? monthQ.data
          : timePeriod === "Semanal"
            ? weekQ.data
            : dayQ.data;
    return toLineData(src ?? {});
  }, [timePeriod, yearQ.data, monthQ.data, weekQ.data, dayQ.data]);

  const isLoading = loadingByPeriod[timePeriod];

  const OnChangeTimePeriod = (period: TimePeriodOption) => {
    setTimePeriod(period);
  };

  return (
    <Card className="p-4">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex shrink-0 flex-wrap items-center justify-end gap-3">
          <ButtonGroup>
            {TIME_PERIOD_OPTIONS.map((opt) => (
              <Button
                key={opt}
                variant={timePeriod === opt ? "default" : "outline"}
                size="sm"
                onClick={() => OnChangeTimePeriod(opt)}
                className={timePeriod === opt ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]" : "bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"}
              >
                {opt}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        {isLoading ? (
          <EmptyCardLoader title={timePeriod} description="Cargando datos..." okIcon={false} />
        ) : (
          <ChartContainer config={LINE_CHART_CONFIG} className="h-[360px] min-h-0 w-full">
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
      </div>
    </Card>
  );
}
