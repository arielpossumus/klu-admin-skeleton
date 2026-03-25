import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AllCommercesGridApiRow } from "@/types/commerce/CommerceList";
const isActivo = (status: string) => status.trim().toUpperCase() === "ACTIVO";
const isInactivo = (status: string) => status.trim().toUpperCase() === "INACTIVO";

const dash = (v: string | undefined): string => {
    const t = v?.trim() ?? "";
    return t !== "" ? t : "—";
};

const formatAffiliation = (row: AllCommercesGridApiRow): string => {
    const main = dash(row.businessMembership);
    const sub = row.businessSubmembership?.trim() ?? "";
    if (main === "—" && sub === "") return "—";
    if (sub === "" || main === "—") return main !== "—" ? main : sub;
    return `${main} · ${sub}`;
};

export const allCommercesColumns: ColumnDef<AllCommercesGridApiRow>[] = [
    {
        accessorKey: "businessId",
        header: "ID",
        cell: ({ getValue }) => {
            const v = getValue<number>();
            return v != null ? String(v) : "—";
        },
    },
    {
        accessorKey: "corporate",
        header: "Corporativo",
        cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
        accessorKey: "businessName",
        header: "Nombre",
        cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
        id: "affiliation",
        header: "Afiliación",
        accessorFn: (row) => formatAffiliation(row),
        cell: ({ row }) => formatAffiliation(row.original),
    },
    {
        accessorKey: "businessLine",
        header: "Giro",
        cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
        accessorKey: "businessPhone",
        header: "Teléfono",
        cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
        accessorKey: "businessEmail",
        header: "Correo electrónico",
        cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
        accessorKey: "businessStatus",
        header: "Estatus",
        cell: ({ getValue }) => {
            const raw = getValue<string>();
            const status = raw?.trim() ?? "";
            if (status === "") return "—";
            const activo = isActivo(status);
            const inactivo = isInactivo(status);
            if (!activo && !inactivo) {
                return (
                    <Badge variant="outline" className="font-medium">
                        {status}
                    </Badge>
                );
            }
            return (
                <Badge
                    className={cn(
                        "border-0 font-medium",
                        activo
                            ? "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]/90"
                            : "bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90"
                    )}
                >
                    {status}
                </Badge>
            );
        },
    },
];
