import type { ChartConfig } from "@/components/ui/chart";

/** Opciones de agregación del card de distribución (antes en host `config/options`). */
export const DISTRIBUTION_AGGREGATION_OPTIONS = [
  { value: "total", label: "Total" },
  { value: "corporativo", label: "por Corporativo" },
  { value: "comercio", label: "por comercio" },
  { value: "sucursal", label: "por sucursal" },
] as const;

export const DISTRIBUTION_CURRENCY_OPTIONS = ["Pesos", "Dolares"] as const;

export type DistributionAggregationValue = (typeof DISTRIBUTION_AGGREGATION_OPTIONS)[number]["value"];
export type DistributionCurrencyOption = (typeof DISTRIBUTION_CURRENCY_OPTIONS)[number];

export const DISTRIBUTION_DONUT_CHART_CONFIG = {
  Aprobadas: {
    label: "Aprobados",
    color: "var(--color-success-dark)",
  },
  Rechazadas: {
    label: "Rechazados",
    color: "var(--color-error-dark)",
  },
} satisfies ChartConfig;
