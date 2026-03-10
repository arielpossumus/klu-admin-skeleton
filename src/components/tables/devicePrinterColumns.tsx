import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

export interface DevicePrinter {
    posCorporation: string;
    posBusiness: string;
    posBranch?: string;
    posSerial: string;
    posBrand: string;
    posModel: string;
    printerAvailable?: string;
    printerState?: string;
}

export const devicePrinterColumns: ColumnDef<DevicePrinter>[] = [
    {
        accessorKey: "posCorporation",
        header: "Corporativo",
    },
    {
        accessorKey: "posBusiness",
        header: "Comercio",
    },
    {
        accessorKey: "posBranch",
        header: "Sucursal",
        cell: ({ row }) => row.getValue("posBranch") ?? "—",
    },
    {
        accessorKey: "posSerial",
        header: "Serial",
        cell: ({ row }) => {
            const serial = row.getValue<string>("posSerial");
            if (!serial) return "—";
            return (
                <Link
                    to={`/pos-health/${encodeURIComponent(serial)}`}
                    className="text-primary underline underline-offset-4 hover:no-underline"
                >
                    {serial}
                </Link>
            );
        },
    },
    {
        accessorKey: "posBrand",
        header: "Marca",
    },
    {
        accessorKey: "posModel",
        header: "Modelo",
    },
    {
        accessorKey: "printerAvailable",
        header: "Impresora disponible",
        cell: ({ row }) => {
            const status = row.getValue<string>("printerAvailable") ?? "—";
            const isAvailable = status === "Disponible";

            return (
                <Badge className={isAvailable ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "printerState",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue<string>("printerState") ?? "—";
            const isOk = status === "Sin error";

            return (
                <Badge className={isOk ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {status}
                </Badge>
            );
        },
    },
];
