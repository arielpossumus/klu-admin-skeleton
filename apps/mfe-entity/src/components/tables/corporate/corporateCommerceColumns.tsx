import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CommerceTableRow } from "@/types/commerce/CommerceList";

const isActivo = (status: string) => status.trim().toUpperCase() === "ACTIVO";

export const corporateCommerceColumns: ColumnDef<CommerceTableRow>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "businessType",
        header: "Tipo de negocio",
        cell: ({ row }) => (
            <span className="max-w-[min(28rem,50vw)] line-clamp-2" title={row.getValue<string>("businessType")}>
                {row.getValue<string>("businessType")}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue<string>("status");
            const activo = isActivo(status);
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
    {
        accessorKey: "legalContactEmail",
        header: "Email contacto legal",
    },
    {
        accessorKey: "legalContactPhone",
        header: "Teléfono contacto legal",
    },
];
