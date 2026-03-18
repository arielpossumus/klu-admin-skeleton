import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Función para obtener el ID único de cada fila (p. ej. por serial). */
  getRowId?: (row: TData) => string;
  /** Si es false, se muestran todas las filas sin paginación. Por defecto true. */
  pagination?: boolean;
  /** ID de la fila expandida (null = ninguna). */
  expandedRowId?: string | null;
  /** Callback al expandir/colapsar una fila. */
  onExpandedChange?: (rowId: string | null) => void;
  /** Contenido a mostrar debajo de la fila expandida. */
  renderExpandedContent?: (row: TData) => ReactNode;
}
