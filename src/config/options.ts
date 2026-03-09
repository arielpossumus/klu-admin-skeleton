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
