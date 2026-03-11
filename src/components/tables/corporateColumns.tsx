import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

import { type CorporateGrid } from "@/types/corporate/CorporateGrid";

export const corporateColumns: ColumnDef<CorporateGrid>[] = [
    {
        accessorKey: "corporateId",
        header: "Id",
    },
    {
        accessorKey: "corporateName",
        header: "Nombre",
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