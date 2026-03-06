import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ChartConfig } from "@/components/ui/chart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AGGREGATION_OPTIONS = [
  { value: "total", label: "Total" },
  { value: "corporativo", label: "por Corporativo" },
  { value: "comercio", label: "por comercio" },
  { value: "sucursal", label: "por sucursal" },
] as const;

export const CURRENCY_OPTIONS = ["Pesos", "Dolares"] as const;
export const TIME_PERIOD_OPTIONS = ["Anual", "Mensual", "Semanal", "Diario"] as const;
export type AggregationValue = (typeof AGGREGATION_OPTIONS)[number]["value"];
export type CurrencyOption = (typeof CURRENCY_OPTIONS)[number];
export type TimePeriodOption = (typeof TIME_PERIOD_OPTIONS)[number];

export const BAR_CHART_CONFIG = {
  hour: {
    label: "Hora",
  },
  aprobadas: {
    label: "Aprobadas",
    color: "#22c55e",
  },
  rechazadas: {
    label: "Rechazadas",
    color: "#ef4444",
  },
} satisfies ChartConfig;
