import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

export interface DeviceBattery {
    posId: number;
    posCorporation: string;
    posBusiness: string;
    posBranch?: string;
    posSerial: string;
    posBrand: string;
    posModel: string;
    batteryAvailable: string;
    chargeLevel: number;
    charging: string;
    connected: string;
}

export const deviceBatteryColumns: ColumnDef<DeviceBattery>[] = [
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
        accessorKey: "batteryAvailable",
        header: "Bateria disponible",
    },
    {
        accessorKey: "chargeLevel",
        header: "Nivel de carga",
        cell: ({ row }) => {
            const level = row.getValue<number>("chargeLevel") ?? 0;

            const barColor =
                level >= 50
                    ? "bg-green-500"
                    : level >= 20
                      ? "bg-orange-400"
                      : "bg-red-500";

            return (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted">
                        <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${Math.min(level, 100)}%` }}
                        />
                    </div>
                    <span className="text-xs tabular-nums">{level}%</span>
                </div>
            );
        },
    },
    {
        accessorKey: "charging",
        header: "Cargando",
    },
    {
        accessorKey: "connected",
        header: "Conectado",
    },
];