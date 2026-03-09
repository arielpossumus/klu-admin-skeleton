import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export interface DeviceConnection {
    posCorporation: string;
    posBusiness: string;
    posBranch?: string;
    posSerial: string;
    posBrand: string;
    posModel: string;
    connectionType?: string;
    wifiSignal?: number;
    wifiName?: string;
    gsmMobileSignal?: number;
    gsmSIMState?: string;
    ethernet?: string;
    networkInitialized?: string;
}

export const deviceConnectionColumns: ColumnDef<DeviceConnection>[] = [
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
        accessorKey: "connectionType",
        header: "Tipo de conexión",
        cell: ({ row }) => row.getValue("connectionType") ?? "—",
    },
    {
        accessorKey: "wifiName",
        header: "Red WiFi",
        cell: ({ row }) => row.getValue("wifiName") ?? "—",
    },
    {
        accessorKey: "wifiSignal",
        header: "Señal WiFi",
        cell: ({ row }) => {
            const signal = row.getValue<number>("wifiSignal");
            if (signal == null) return "—";

            const barColor =
                signal >= 60
                    ? "bg-green-500"
                    : signal >= 30
                        ? "bg-orange-400"
                        : "bg-red-500";

            return (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-muted">
                        <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${Math.min(signal, 100)}%` }}
                        />
                    </div>
                    <span className="text-xs tabular-nums">{signal}%</span>
                </div>
            );
        },
    },
    {
        accessorKey: "gsmSIMState",
        header: "Estado SIM",
        cell: ({ row }) => {
            const state = row.getValue<string>("gsmSIMState");
            if (!state) return "—";

            const isPresent = state !== "No Presente";

            return (
                <Badge className={isPresent ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {state}
                </Badge>
            );
        },
    },
    {
        accessorKey: "ethernet",
        header: "Ethernet",
        cell: ({ row }) => row.getValue("ethernet") ?? "—",
    },
    {
        accessorKey: "networkInitialized",
        header: "Red inicializada",
        cell: ({ row }) => {
            const value = row.getValue<string>("networkInitialized");
            if (!value) return "—";

            const isOk = value === "Sí";

            return (
                <Badge className={isOk ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {value}
                </Badge>
            );
        },
    },
];
