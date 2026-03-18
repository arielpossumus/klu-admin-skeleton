import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Eye } from "lucide-react";

import { type CorporateGrid } from "@/types/corporate/CorporateGrid";

import { CustomAlertDialog } from "../commons/CustomAlertDialog";

export const corporateColumns: ColumnDef<CorporateGrid>[] = [
    {
        accessorKey: "corporateId",
        header: "Id",
    },
    {
        accessorKey: "corporateName",
        header: "Nombre",
        cell: ({ row }) => {
            const name = row.getValue<string>("corporateName");
            const corporateId = row.getValue<number>("corporateId");
            if (!name) return "—";
            return (
                <Link
                    to={`/corporate/${corporateId}`}
                    className="text-primary underline underline-offset-4 hover:no-underline"
                >
                    {name}
                </Link>
            );
        },
    },
    {
        accessorKey: "corporateFiid",
        header: "FIID",
    },

    {
        accessorKey: "corporateTypeBank",
        header: "Modelo Comercial",
    },
    {
        accessorKey: "corporateStatus",
        header: "Estado",
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const name = row.getValue<string>("corporateName");
            const corporateId = row.getValue<number>("corporateId");
            if (!name) return "—";
            return (
                <div className="flex items-center gap-2">
                    <Link
                        to={`/corporate/${corporateId}`}
                        className="cursor-pointer text-[var(--primary)] hover:opacity-80"
                        aria-label="Ver detalle"
                    >
                        <Eye className="size-4" />
                    </Link>
                    <CustomAlertDialog title={`¿Desea dar de baja a ${name}?`} description="Esta acción puede afectar el estado del corporativo. ¿Desea continuar?" />
                </div>
            );
        },
    },

];