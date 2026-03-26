export interface UsageRadialProps {
  total: number;
  used: number;
  label: string;
  /** Valores en bruto para mostrar debajo del porcentaje (ej. total RAM, RAM usada) */
  displayTotal?: unknown;
  displayUsed?: unknown;
}

