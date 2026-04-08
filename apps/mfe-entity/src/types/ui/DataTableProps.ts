import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowId?: (row: TData) => string;
  pagination?: boolean;
  expandedRowId?: string | null;
  onExpandedChange?: (rowId: string | null) => void;
  renderExpandedContent?: (row: TData) => ReactNode;
}
