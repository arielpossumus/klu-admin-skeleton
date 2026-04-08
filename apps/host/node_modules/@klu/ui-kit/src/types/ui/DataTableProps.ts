import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowId?: (row: TData) => string;
  pagination?: boolean;
  expandedRowId?: string | null;
  renderExpandedContent?: (row: TData) => ReactNode;
};
