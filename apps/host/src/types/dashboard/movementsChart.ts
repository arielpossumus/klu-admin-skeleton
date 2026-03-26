export type ChartDataItem = {
  columnName: string;
  totalApproved: number;
  totalRejected: number;
};

export type MovementsResponse = {
  chartData?: ChartDataItem[];
};

export type LineChartDataItem = {
  hour: string;
  aprobadas: number;
  rechazadas: number;
};
