import type { ColumnDef } from "@tanstack/react-table";
import { BadgeX, Pencil } from "lucide-react";

import { CustomAlertDialog } from "@/components/commons/CustomAlertDialog";
import { Button } from "@/components/ui/button";
import type { CommerceMsiRateRow } from "@/types/commerce/CommerceList";

const dash = (v: string | undefined): string => {
  const t = v?.trim() ?? "";
  return t !== "" ? t : "—";
};

const monthLabel = (r: CommerceMsiRateRow): string | undefined => r.month;

const visaMcPct = (r: CommerceMsiRateRow): string | undefined =>
  r.visaMastercardPorcentage;

const amexPct = (r: CommerceMsiRateRow): string | undefined => r.amexPorcentage;

export type CommerceMsiRatesColumnOptions = {
  onEditRow: (row: CommerceMsiRateRow) => void;
  onDeleteRow: (row: CommerceMsiRateRow) => void;
};

export const createCommerceMsiRatesColumns = (
  options: CommerceMsiRatesColumnOptions
): ColumnDef<CommerceMsiRateRow>[] => [
  {
    id: "mes",
    header: "Mes",
    accessorFn: (row) => monthLabel(row),
    cell: ({ row }) => dash(monthLabel(row.original)),
  },
  {
    id: "visaMastercard",
    header: "Visa / Mastercard",
    accessorFn: (row) => visaMcPct(row),
    cell: ({ row }) => dash(visaMcPct(row.original)),
  },
  {
    id: "amex",
    header: "Amex",
    accessorFn: (row) => amexPct(row),
    cell: ({ row }) => dash(amexPct(row.original)),
  },
  {
    id: "acciones",
    header: "Acciones",
    enableSorting: false,
    cell: ({ row }) => {
      const original = row.original;
      const name = dash(monthLabel(original));

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
            aria-label="Editar comisión MSI"
            onClick={() => options.onEditRow(original)}
          >
            <Pencil className="size-4" aria-hidden />
          </Button>
          <CustomAlertDialog
            title={`¿Desea eliminar la comisión MSI ${name}?`}
            description="Esta acción eliminará la comisión del listado. ¿Desea continuar?"
            onConfirm={handleConfirmDelete}
          >
            <button
              type="button"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-[var(--error-dark)] transition-opacity hover:bg-[var(--error-dark)]/10 hover:opacity-80"
              aria-label="Eliminar comisión MSI"
            >
              <BadgeX className="size-4" aria-hidden />
            </button>
          </CustomAlertDialog>
        </div>
      );
    },
  },
];
