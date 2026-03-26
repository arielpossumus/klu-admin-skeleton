import type { ChartConfig } from "@/components/ui/chart";

export const DONUT_TRANSACTIONS_CONFIG = {
  Aprobadas: {
    label: "Aprobados",
    color: "var(--color-success-dark)",
  },
  Rechazadas: {
    label: "Rechazados",
    color: "var(--color-error-dark)",
  },
} satisfies ChartConfig;

export const BAR_CHART_CONFIG = {
  hour: {
    label: "Hora",
  },
  aprobadas: {
    label: "Aprobados",
    color: "var(--color-success-dark)",
  },
  rechazadas: {
    label: "Rechazados",
    color: "var(--color-error-dark)",
  },
} satisfies ChartConfig;

export const LINE_CHART_CONFIG = {
  hour: {
    label: "Hora",
  },
  aprobadas: {
    label: "Aprobados",
    color: "var(--color-success-dark)",
  },
  rechazadas: {
    label: "Rechazados",
    color: "var(--color-error-dark)",
  },
} satisfies ChartConfig;

export const PANEL_PIE_CHART_CONFIG = {
  visa: {
    label: "Visa",
    color: "var(--color-primary)",
  },
  mastercard: {
    label: "Mastercard",
    color: "var(--color-info-dark)",
  },
  carnet: {
    label: "Carnet",
    color: "var(--color-success-dark)",
  },
  amex: {
    label: "Amex",
    color: "var(--color-warning-dark)",
  },
  otros: {
    label: "Otros",
    color: "var(--color-error-dark)",
  },
} satisfies ChartConfig;

export const INCIDENT_COLORS = [
  "var(--color-primary)",
  "var(--color-info-dark)",
  "var(--color-success-dark)",
];

export const INCIDENTS_BAR_CHART_CONFIG = {
  bateria: {
    label: "Batería",
    color: "var(--color-success-dark)",
  },
  impresora: {
    label: "Impresora",
    color: "var(--color-error-dark)",
  },
  conexion: {
    label: "Conexión",
    color: "var(--color-info-dark)",
  },
} satisfies ChartConfig;

export const TOP_CORPORATIVOS_CHART_CONFIG = {
  corporativo: {
    label: "Corporativo",
  },
  transacciones: {
    label: "Transacciones",
    color: "var(--color-primary)",
  },
  monto: {
    label: "Monto",
    color: "var(--color-info-dark)",
  },
} satisfies ChartConfig;

export const BAR_COLORS = [
  "var(--color-primary)",
  "var(--color-info-dark)",
  "var(--color-success-dark)",
  "var(--color-warning-dark)",
  "var(--color-error-dark)",
];
