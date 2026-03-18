import type { ColumnDef } from "@tanstack/react-table";
import type { ModelCommercialTransaction } from "@/types/corporate/Corporate";

export const transactionLiteColumns: ColumnDef<ModelCommercialTransaction>[] = [
    {
        accessorKey: "transactionRange",
        header: "Número de transacciones",
    },
    {
        accessorKey: "costPerTransaction",
        header: "Costo por transacción",
        cell: ({ row }) => {
            const v = row.getValue<number>("costPerTransaction");
            return v != null ? v.toFixed(6) : "—";
        },
    },
    {
        accessorKey: "iva",
        header: "IVA",
    },
    {
        accessorKey: "total",
        header: "TOTAL",
        cell: ({ row }) => {
            const v = row.getValue<number>("total");
            return v != null ? v.toFixed(6) : "—";
        },
    },
];