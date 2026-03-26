import type { ChartConfig } from "@/components/ui/chart";

export type PieChartDataItem = { name: string; value: number };

export type AcceptanceChartProps = {
  data: PieChartDataItem[];
  config?: ChartConfig;
};
