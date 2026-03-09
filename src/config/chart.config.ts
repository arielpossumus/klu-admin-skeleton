import type { ChartConfig } from "@/components/ui/chart";

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

export const RING_CHART_CONFIG = {
  aprobadas: {
    label: "Aprobadas",
    color: "#22c55e",
  },
  rechazadas: {
    label: "Rechazadas",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export const PANEL_PIE_CHART_CONFIG = {
  visa: {
    label: "Visa",
    color: "#1a1f71",
  },
  mastercard: {
    label: "Mastercard",
    color: "#eb001b",
  },
  carnet: {
    label: "Carnet",
    color: "#00a4e0",
  },
  amex: {
    label: "Amex",
    color: "#006fcf",
  },
  otros: {
    label: "Otros",
    color: "#6c757d",
  },
} satisfies ChartConfig;

export const INCIDENTS_BAR_CHART_CONFIG = {
  bateria: {
    label: "Batería",
    color: "#f59e0b",
  },
  impresora: {
    label: "Impresora",
    color: "#0b3c36",
  },
  conexion: {
    label: "Conexión",
    color: "#527098",
  },
} satisfies ChartConfig;
