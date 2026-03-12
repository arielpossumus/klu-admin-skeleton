import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

import { type CorporateGrid } from "@/types/Corporate/CorporateGrid";

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

];