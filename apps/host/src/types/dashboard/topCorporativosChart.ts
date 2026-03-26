export type TopRow = {
  ranking: number;
  corporativo: string;
  transacciones: number;
  monto: number;
};

export type TopResponse = {
  period: string;
  data: TopRow[];
};

export type TopCorporativosMonthOption = "Febrero" | "Marzo";
