import type { ColumnDef } from "@tanstack/react-table";
import { BadgeX, Pencil } from "lucide-react";

import { CustomAlertDialog } from "@/components/commons/CustomAlertDialog";
import { Button } from "@/components/ui/button";
import type { CommerceTradeRateRow } from "@/types/commerce/CommerceList";

const dash = (v: string | undefined): string => {
  const t = v?.trim() ?? "";
  return t !== "" ? t : "—";
};

const rateName = (r: CommerceTradeRateRow): string | undefined =>
  r.rateName ?? r.nombreTasa;

const ratePercentage = (r: CommerceTradeRateRow): string | undefined =>
  r.ratePercentage ?? r.porcentajeTasa;

const ivaLabel = (r: CommerceTradeRateRow): string | undefined => {
  if (typeof r.ivaIncluded === "boolean") {
    return r.ivaIncluded ? "Sí" : "No";
  }
  return r.ivaIncluido;
};

const chargeType = (r: CommerceTradeRateRow): string | undefined =>
  r.chargeType ?? r.tipoCobro;

const channelType = (r: CommerceTradeRateRow): string | undefined =>
  r.channelType ?? r.tipoCanal;

export type CommerceTradeRatesColumnOptions = {
  onEditRow: (row: CommerceTradeRateRow) => void;
  onDeleteRow: (row: CommerceTradeRateRow) => void;
};

export const createCommerceTradeRatesColumns = (
  options: CommerceTradeRatesColumnOptions
): ColumnDef<CommerceTradeRateRow>[] => [
  {
    id: "nombreTasa",
    header: "Nombre Tasa",
    accessorFn: (row) => rateName(row),
    cell: ({ row }) => dash(rateName(row.original)),
  },
  {
    id: "porcentajeTasa",
    header: "Porcentaje Tasa",
    accessorFn: (row) => ratePercentage(row),
    cell: ({ row }) => dash(ratePercentage(row.original)),
  },
  {
    id: "ivaIncluido",
    header: "Iva Incluido",
    accessorFn: (row) => ivaLabel(row),
    cell: ({ row }) => dash(ivaLabel(row.original)),
  },
  {
    id: "tipoCobro",
    header: "Tipo Cobro",
    accessorFn: (row) => chargeType(row),
    cell: ({ row }) => dash(chargeType(row.original)),
  },
  {
    id: "tipoCanal",
    header: "Tipo Canal",
    accessorFn: (row) => channelType(row),
    cell: ({ row }) => dash(channelType(row.original)),
  },
  {
    id: "acciones",
    header: "Acciones",
    enableSorting: false,
    cell: ({ row }) => {
      const original = row.original;
      const name = dash(rateName(original));

      const handleConfirmDelete = () => {
        options.onDeleteRow(original);
      };

      return (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[var(--success-dark)] hover:bg-[var(--success-dark)]/10 hover:text-[var(--success-dark)]"
            aria-label="Editar tasa"
            onClick={() => options.onEditRow(original)}
          >
            <Pencil className="size-4" aria-hidden />
          </Button>
          <CustomAlertDialog
            title={`¿Desea eliminar la tasa ${name}?`}
            description="Esta acción eliminará la tasa del listado. ¿Desea continuar?"
            onConfirm={handleConfirmDelete}
          >
            <button
              type="button"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-[var(--error-dark)] transition-opacity hover:bg-[var(--error-dark)]/10 hover:opacity-80"
              aria-label="Eliminar tasa"
            >
              <BadgeX className="size-4" aria-hidden />
            </button>
          </CustomAlertDialog>
        </div>
      );
    },
  },
];
